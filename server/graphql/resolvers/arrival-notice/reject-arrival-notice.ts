import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain, sendNotification } from '@things-factory/shell'
import { EntityManager, getManager } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas, ReleaseGood } from '../../../entities'
import { rejectReleaseGood } from '../release-good/reject-release-good'

export const rejectArrivalNoticeResolver = {
  async rejectArrivalNotice(_: any, { name, patch: { remark } }, context: any) {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      const arrivalNotice: ArrivalNotice = await rejectArrivalNotice(trxMgr, name, remark, context)

      if (arrivalNotice.crossDocking) {
        const { releaseGood }: { releaseGood: ReleaseGood } = await trxMgr
          .getRepository(ArrivalNotice)
          .findOne(arrivalNotice.id, {
            relations: ['releaseGood']
          })

        if (releaseGood.status !== ORDER_STATUS.REJECTED) {
          await rejectReleaseGood(trxMgr, releaseGood.name, remark, context)
        }
      }

      return arrivalNotice
    })
  }
}

export async function rejectArrivalNotice(
  trxMgr: EntityManager,
  name: string,
  remark: string,
  context: any
): Promise<ArrivalNotice> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  const foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
    where: { domain, name, status: ORDER_STATUS.PENDING_RECEIVE },
    relations: ['bizplace', 'orderProducts', 'orderVass', 'collectionOrders']
  })

  if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
  if (!remark) throw new Error('Remark is not exist.')

  let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
  let foundOVs: OrderVas[] = foundArrivalNotice.orderVass
  let foundCOs: CollectionOrder[] = foundArrivalNotice.collectionOrders
  let customerBizplace: Bizplace = foundArrivalNotice.bizplace

  // 1. Update status of order products (PENDING_RECEIVE => REJECTED)
  foundOPs = foundOPs.map((op: OrderProduct) => {
    op.status = ORDER_PRODUCT_STATUS.REJECTED
    op.updater = user
    return op
  })
  await trxMgr.getRepository(OrderProduct).save(foundOPs)

  // 2. Update status of order vass if it exists (PENDING_RECEIVE => REJECTED)
  if (foundOVs && foundOVs.length) {
    foundOVs = foundOVs.map((ov: OrderVas) => {
      ov.status = ORDER_VAS_STATUS.REJECTED
      ov.updater = user
      return ov
    })
    await trxMgr.getRepository(OrderVas).save(foundOVs)
  }

  // 3. If there's collection order, update status of collection order (PENDING_RECEIVE => REJECTED)
  if (foundCOs) {
    foundCOs = foundCOs.map((co: CollectionOrder) => {
      co.status = ORDER_STATUS.REJECTED
      co.updater = user
      return co
    })
    await trxMgr.getRepository(CollectionOrder).save(foundCOs)
  }

  foundArrivalNotice.remark = remark
  foundArrivalNotice.status = ORDER_STATUS.REJECTED
  foundArrivalNotice.updater = user
  await trxMgr.getRepository(ArrivalNotice).save(foundArrivalNotice)

  // notification logics
  // get Customer by bizplace
  const users: any[] = await trxMgr
    .getRepository('bizplaces_users')
    .createQueryBuilder('bu')
    .select('bu.user_id', 'id')
    .where(qb => {
      const subQuery = qb
        .subQuery()
        .select('bizplace.id')
        .from(Bizplace, 'bizplace')
        .where('bizplace.name = :bizplaceName', { bizplaceName: customerBizplace.name })
        .getQuery()
      return 'bu.bizplace_id IN ' + subQuery
    })
    .getRawMany()

  // send notification to Customer Users
  if (users?.length) {
    const msg = {
      title: `Latest status for ${foundArrivalNotice.name}`,
      message: `Your GAN has been rejected.`,
      url: context.header.referer
    }
    users.forEach(user => {
      sendNotification({
        receiver: user.id,
        message: JSON.stringify(msg)
      })
    })
  }

  return foundArrivalNotice
}
