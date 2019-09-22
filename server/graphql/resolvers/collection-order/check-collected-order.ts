import { getManager, getRepository } from 'typeorm'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const checkCollectedOrder = {
  async checkCollectedOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts']
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.COLLECTING) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products & status of arrival notice  (COLLECTING => COLLECTED)
        collectionOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.COLLECTED, updater: context.state.user }
          )
        })

        await getRepository(CollectionOrder).save({
          ...collectionOrder,
          status: ORDER_STATUS.DONE,
          updater: context.state.user
        })

        return collectionOrder
      } catch (e) {
        throw e
      }
    })
  }
}
