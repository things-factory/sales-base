import { Product } from '@things-factory/product-base'
import { getManager, getRepository } from 'typeorm'
import { CollectionOrder, OrderProduct, OrderVas, Vas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateCollectionOrder = {
  async generateCollectionOrder(_: any, { collectionOrder }, context: any) {
    return await getManager().transaction(async () => {
      const newCollectionOrder = collectionOrder.collectionOrder
      let products = collectionOrder.products
      let vass = collectionOrder.vass

      // 1. Create collection order
      const createdCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).save({
        name: OrderNoGenerator.collectionOrder(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        ...newCollectionOrder,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create collection order product
      products = await Promise.all(
        products.map(async (product: OrderProduct) => {
          return {
            ...product,
            domain: context.state.domain,
            name: OrderNoGenerator.orderProduct(),
            product: await getRepository(Product).findOne(product.product.id),
            collectionOrder: createdCollectionOrder,
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
            name: OrderNoGenerator.orderVas(),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            collectionOrder: createdCollectionOrder,
            bizplace: context.state.mainBizplace,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(vass)

      return createdCollectionOrder
    })
  }
}
