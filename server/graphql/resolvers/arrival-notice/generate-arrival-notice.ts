import { Product } from '@things-factory/product-base'
import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice, OrderProduct, OrderVas, Vas, CollectionOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS, ORDER_STATUS } from '../../../constants'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { arrivalNotice, collectionOrder }, context: any) {
    return await getManager().transaction(async () => {
      const newArrivalNotice: ArrivalNotice = arrivalNotice.arrivalNotice
      let products: OrderProduct[] = arrivalNotice.products
      let vass: OrderVas[] = arrivalNotice.vass

      // 1. Create collection order
      if (collectionOrder) {
        newArrivalNotice.collectionOrder = await getRepository(CollectionOrder).save({
          ...collectionOrder,
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          status: ORDER_STATUS.PENDING,
          creator: context.state.user,
          updater: context.state.user
        })
      }

      // 2. Create arrival notice
      const createdArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).save({
        ...newArrivalNotice,
        name: OrderNoGenerator.arrivalNotice(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      // 3. Create arrival notice product
      products = await Promise.all(
        products.map(async (product: OrderProduct) => {
          return {
            ...product,
            domain: context.state.domain,
            name: OrderNoGenerator.orderProduct(createdArrivalNotice.name, product.batchId, product.seq),
            product: await getRepository(Product).findOne(product.product.id),
            arrivalNotice: createdArrivalNotice,
            bizplace: context.state.mainBizplace,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderProduct).save(products)

      // 4. Create arrival notice vas
      vass = await Promise.all(
        vass.map(async (vas: OrderVas) => {
          return {
            ...vas,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(createdArrivalNotice.name, vas.batchId, vas.vas.name),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            arrivalNotice: createdArrivalNotice,
            bizplace: context.state.mainBizplace,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(vass)

      return createdArrivalNotice
    })
  }
}
