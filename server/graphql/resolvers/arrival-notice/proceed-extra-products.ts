import { ArrivalNotice, OrderProduct } from '../../../entities'
import { ORDER_STATUS, ORDER_PRODUCT_STATUS } from '../../../constants/order'
import { EntityManager, getManager } from 'typeorm'
import { getMyBizplace } from '@things-factory/biz-base'

export const proceedExtraProductsResolver = {
  async proceedExtraProducts(_: any, { ganNo, approvedProducts, rejectedProducts }, context: any): Promise<void> {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      // Validation
      // Check status of GAN
      const arrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: {
          domain: context.state.domain,
          bizplace: await getMyBizplace(context.state.user),
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
    })
  }
}
