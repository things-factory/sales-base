import { Product } from '@things-factory/product-base'
import { getManager, getRepository, In } from 'typeorm'
import { DeliveryOrder, OrderProduct, OrderVas, Vas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editDeliveryOrder = {
  async editDeliveryOrder(_: any, { name, deliveryOrder }, context: any) {
    const foundDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderVass', 'creator', 'updater']
    })

    try {
      if (!foundDeliveryOrder) throw new Error(`Delivery order doesn't exists.`)
      if (foundDeliveryOrder.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async () => {
        // 1. delete order products
        const orderProductIds = foundDeliveryOrder.orderProducts.map(product => product.id)
        await getRepository(OrderProduct).delete({ id: In(orderProductIds) })

        // 2. delete order vass
        const orderVasIds = foundDeliveryOrder.orderVass.map(vas => vas.id)
        await getRepository(OrderVas).delete({ id: In(orderVasIds) })

        // 3. update collection order
        const updatedDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).save({
          ...foundDeliveryOrder,
          ...deliveryOrder.deliveryOrder,
          updater: context.state.user
        })

        // 4. create order products
        const products = await Promise.all(
          deliveryOrder.products.map(async (product: OrderProduct) => {
            return {
              ...product,
              domain: context.state.domain,
              name: OrderNoGenerator.orderProduct(foundDeliveryOrder.name, product.batchId, product.seq),
              product: await getRepository(Product).findOne(product.product.id),
              deliveryOrder: updatedDeliveryOrder,
              status: ORDER_PRODUCT_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderProduct).save(products)

        // 5. create order vas
        const vass = await Promise.all(
          deliveryOrder.vass.map(async (vas: OrderVas) => {
            return {
              ...vas,
              domain: context.state.domain,
              name: OrderNoGenerator.orderVas(foundDeliveryOrder.name, vas.batchId, vas.vas.name),
              vas: await getRepository(Vas).findOne(vas.vas.id),
              deliveryOrder: updatedDeliveryOrder,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderVas).save(vass)

        return updatedDeliveryOrder
      })
    } catch (e) {
      throw e
    }
  }
}
