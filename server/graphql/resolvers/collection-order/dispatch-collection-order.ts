import { getManager } from 'typeorm'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const dispatchCollectionOrder = {
  async dispatchCollectionOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      try {
        const collectionOrder: CollectionOrder = await transactionalEntityManager
          .getRepository(CollectionOrder)
          .findOne({
            where: { domain: context.state.domain, name },
            relations: ['orderProducts']
          })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (READY_TO_COLLECT => INTRANSIT) & status of collection order  (READY_TO_DISPATCH => COLLECTING)
        collectionOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await transactionalEntityManager
            .getRepository(OrderProduct)
            .update(
              { id: orderProduct.id },
              { ...orderProduct, status: ORDER_PRODUCT_STATUS.INTRANSIT, updater: context.state.user }
            )
        })

        await transactionalEntityManager.getRepository(CollectionOrder).save({
          ...collectionOrder,
          status: ORDER_STATUS.COLLECTING,
          updater: context.state.user
        })

        return collectionOrder
      } catch (e) {
        throw e
      }
    })
  }
}
