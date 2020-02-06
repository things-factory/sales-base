import { Role } from '@things-factory/auth-base'
import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { sendNotification } from '@things-factory/shell'
import { EntityManager, getManager } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants/order'
import { ArrivalNotice, OrderProduct } from '../../../entities'

export const proceedExtraProductsResolver = {
  async proceedExtraProducts(_: any, { ganNo, approvedProducts, rejectedProducts }, context: any): Promise<void> {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      // Validation
      // Check status of GAN
      const customerBizplace: Bizplace = await getMyBizplace(context.state.user)
      const arrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: {
          domain: context.state.domain,
          bizplace: customerBizplace,
          name: ganNo
        },
        relations: ['orderProducts']
      })

      if (arrivalNotice.status !== ORDER_STATUS.PROCESSING)
        throw new Error(`Status (${arrivalNotice.status}) of GAN is not available to proceed extra products.`)

      // Validation
      // Check numbers of target products
      // (approvedProducts + rejectedProducts = target order products)
      const targetProdCnt: number = arrivalNotice.orderProducts.filter(
        (op: OrderProduct) => op.status === ORDER_PRODUCT_STATUS.READY_TO_APPROVED
      ).length
      if (approvedProducts.length + rejectedProducts.length != targetProdCnt)
        throw new Error(`Invalid numbers of extra products`)

      approvedProducts = approvedProducts.map((approvedProd: OrderProduct) => {
        return {
          ...approvedProd,
          status: ORDER_PRODUCT_STATUS.READY_TO_UNLOAD,
          updater: context.state.user
        }
      })

      await trxMgr.getRepository(OrderProduct).save(approvedProducts)
      await trxMgr
        .getRepository(OrderProduct)
        .delete(rejectedProducts.map((rejectedProd: OrderProduct) => rejectedProd.id))

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
            .andWhere('role.domain_id = :domain', { domain: context.state.domain.id })
            .getQuery()
          return 'ur.roles_id IN ' + subQuery
        })
        .getRawMany()

      // send notification to Office Admin Users
      if (users?.length) {
        const msg = {
          title: `Extra products approved/rejected by ${customerBizplace.name}`,
          message: `Newly approved products are ready to unloading`,
          url: context.header.referer
        }
        users.forEach(user => {
          sendNotification({
            receiver: user.id,
            message: JSON.stringify(msg)
          })
        })
      }
    })
  }
}
