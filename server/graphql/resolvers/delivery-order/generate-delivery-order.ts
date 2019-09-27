import { Product } from '@things-factory/product-base'
import { getManager, getRepository } from 'typeorm'
import { DeliveryOrder, OrderProduct, OrderVas, Vas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateDeliveryOrder = {
  async generateDeliveryOrder(_: any, { deliveryOrder }, context: any) {
    return await getManager().transaction(async () => {
      const newDeliveryOrder = deliveryOrder.deliveryOrder
      let products = deliveryOrder.products
      let vass = deliveryOrder.vass

      // 1. Create collection order
      const createdDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).save({
        name: OrderNoGenerator.deliveryOrder(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
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
            bizplace: context.state.mainBizplace,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderProduct).save(products)

      // 3. Create collection order vas
      vass = await Promise.all(
        vass.map(async (vas: OrderVas) => {
          return {
            ...vas,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(createdDeliveryOrder.name, vas.batchId, vas.vas.name),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            deliveryOrder: createdDeliveryOrder,
            bizplace: context.state.mainBizplace,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(vass)

      return createdDeliveryOrder
    })
  }
}
