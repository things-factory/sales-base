import { getManager, getRepository, In } from 'typeorm'
import { OrderProduct, OrderVas, Product, Vas, CollectionOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editCollectionOrder = {
  async editCollectionOrder(_: any, { name, collectionOrder }, context: any) {
    const foundCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderVass', 'creator', 'updater']
    })

    try {
      if (!foundCollectionOrder) throw new Error(`Collection order doesn't exists.`)
      if (foundCollectionOrder.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async transactionalEntityManager => {
        // 1. delete order products
        const orderProductIds = foundCollectionOrder.orderProducts.map(product => product.id)
        await transactionalEntityManager.getRepository(OrderProduct).delete({ id: In(orderProductIds) })

        // 2. delete order vass
        const orderVasIds = foundCollectionOrder.orderVass.map(vas => vas.id)
        await transactionalEntityManager.getRepository(OrderVas).delete({ id: In(orderVasIds) })

        // 3. update collection order
        const updatedCollectionOrder: CollectionOrder = await transactionalEntityManager
          .getRepository(CollectionOrder)
          .save({
            ...foundCollectionOrder,
            ...collectionOrder.collectionOrder,
            updater: context.state.user
          })

        // 4. create order products
        const products = await Promise.all(
          collectionOrder.products.map(async (product: OrderProduct) => {
            return {
              ...product,
              domain: context.state.domain,
              name: OrderNoGenerator.orderProduct(foundCollectionOrder.name, product.batchId, product.seq),
              product: await getRepository(Product).findOne(product.product.id),
              collectionOrder: updatedCollectionOrder,
              status: ORDER_PRODUCT_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await transactionalEntityManager.getRepository(OrderProduct).save(products)

        // 5. create order vas
        const vass = await Promise.all(
          collectionOrder.vass.map(async (vas: OrderVas) => {
            return {
              ...vas,
              domain: context.state.domain,
              name: OrderNoGenerator.orderVas(foundCollectionOrder.name, vas.batchId, vas.vas.name),
              vas: await getRepository(Vas).findOne(vas.vas.id),
              collectionOrder: updatedCollectionOrder,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await transactionalEntityManager.getRepository(OrderVas).save(vass)

        return updatedCollectionOrder
      })
    } catch (e) {
      throw e
    }
  }
}
