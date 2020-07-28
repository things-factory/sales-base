import { Role, User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain, sendNotification } from '@things-factory/shell'
import { EntityManager, getManager } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, OrderProduct, OrderVas, ReleaseGood } from '../../../entities'
import { confirmReleaseGood } from '../release-good/confirm-release-good'

export const confirmArrivalNoticeResolver = {
  async confirmArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const arrivalNotice: ArrivalNotice = await confirmArrivalNotice(trxMgr, name, context)

      // If current GAN has cross docking
      if (arrivalNotice.crossDocking) {
        const { releaseGood } = await trxMgr.getRepository(ArrivalNotice).findOne(arrivalNotice.id, {
          relations: ['releaseGood']
        })

        // If status of related RO is not equal to PENDING_RECEIVE (i.e. Wasn't confirmed yet.)
        if (releaseGood.status !== ORDER_STATUS.PENDING_RECEIVE) {
          await confirmReleaseGood(trxMgr, releaseGood.name, context)
        }
      }

      return arrivalNotice
    })
  }
}

export async function confirmArrivalNotice(trxMgr: EntityManager, name: string, context: any): Promise<ArrivalNotice> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  const foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
    where: { domain, name, status: ORDER_STATUS.PENDING },
    relations: [
      'bizplace',
      'releaseGood',
      'orderProducts',
      'orderProducts.product',
      'orderVass',
      'orderVass.vas',
      'creator',
      'updater'
    ]
  })

  let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
  let foundOVs: OrderVas[] = foundArrivalNotice.orderVass
  let customerBizplace: Bizplace = foundArrivalNotice.bizplace

  if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

  // 1. GAN Status change (PENDING => PENDING_RECEIVE)
  const arrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).save({
    ...foundArrivalNotice,
    status: ORDER_STATUS.PENDING_RECEIVE,
    updater: user
  })

  foundOPs = foundOPs.map((op: OrderProduct) => {
    return { ...op, status: ORDER_PRODUCT_STATUS.PENDING_RECEIVE }
  })
  await trxMgr.getRepository(OrderProduct).save(foundOPs)

  // 2. Update order vas status if it exists.
  if (foundOVs && foundOVs.length) {
    foundOVs = foundOVs.map((ov: OrderVas) => {
      return { ...ov, status: ORDER_VAS_STATUS.PENDING_RECEIVE }
    })

    await trxMgr.getRepository(OrderVas).save(foundOVs)
  }

  // notification logics
  // get Office Admin Users
  const users: any[] = await trxMgr
    .getRepository('users_roles')
    .createQueryBuilder('ur')
    .select('ur.users_id', 'id')
    .where(qb => {
      const subQuery = qb
        .subQuery()
        .select('role.id')
        .from(Role, 'role')
        .where("role.name = 'Office Admin'")
        .andWhere('role.domain_id = :domain', { domain: domain.id })
        .getQuery()
      return 'ur.roles_id IN ' + subQuery
    })
    .getRawMany()

  // send notification to Office Admin Users
  if (users?.length) {
    const msg = {
      title: `New Arrival Notice from ${customerBizplace.name}`,
      message: `New incoming order, ${foundArrivalNotice.name} is pending for receiving`,
      url: context.header.referer
    }
    users.forEach(user => {
      sendNotification({
        receiver: user.id,
        message: JSON.stringify(msg)
      })
    })
  }

  return arrivalNotice
}
