import { getManager, getRepository } from 'typeorm'
import { OrderProduct, OrderVas, Product, Vas, DeliveryOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateDeliveryOrder = {
  async generateDeliveryOrder(_: any, { deliveryOrder }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      const newDeliveryOrder = deliveryOrder.deliveryOrder
      let products = deliveryOrder.products
      let vass = deliveryOrder.vass

      // 1. Create collection order
      const createdDeliveryOrder: DeliveryOrder = await transactionalEntityManager.getRepository(DeliveryOrder).save({
        name: OrderNoGenerator.deliveryOrder(),
        domain: context.state.domain,
        bizplace: context.state.bizplaces[0],
        ...newDeliveryOrder,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create collection order product
      products = await Promise.all(
        products.map(async (product: OrderProduct) => {
          return {
            ...product,
            domain: context.state.domain,
            name: OrderNoGenerator.orderProduct(createdDeliveryOrder.name, product.batchId, product.seq),
            product: await getRepository(Product).findOne(product.product.id),
            deliveryOrder: createdDeliveryOrder,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await transactionalEntityManager.getRepository(OrderProduct).save(products)

      // 3. Create collection order vas
      vass = await Promise.all(
        vass.map(async (vas: OrderVas) => {
          return {
            ...vas,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(createdDeliveryOrder.name, vas.batchId, vas.vas.name),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            deliveryOrder: createdDeliveryOrder,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await transactionalEntityManager.getRepository(OrderVas).save(vass)

      return createdDeliveryOrder
    })
  }
}
