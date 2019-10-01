import { Product } from '@things-factory/product-base'
import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice, OrderProduct, OrderVas, Vas, CollectionOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS, ORDER_STATUS } from '../../../constants'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { arrivalNotice, collectionOrder }, context: any) {
    return await getManager().transaction(async () => {
      let orderProducts: OrderProduct[] = arrivalNotice.orderProducts
      let orderVass: OrderVas[] = arrivalNotice.orderVass

      // 1. Create collection order
      if (collectionOrder) {
        arrivalNotice.collectionOrder = await getRepository(CollectionOrder).save({
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
        ...arrivalNotice,
        name: OrderNoGenerator.arrivalNotice(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      // 3. Create arrival notice product
      orderProducts = await Promise.all(
        orderProducts.map(async (op: OrderProduct) => {
          return {
            ...op,
            domain: context.state.domain,
            name: OrderNoGenerator.orderProduct(),
            product: await getRepository(Product).findOne({ domain: context.state.domain, id: op.product.id }),
            arrivalNotice: createdArrivalNotice,
            bizplace: context.state.mainBizplace,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderProduct).save(orderProducts)

      // 4. Create arrival notice vas
      orderVass = await Promise.all(
        orderVass.map(async (ov: OrderVas) => {
          return {
            ...ov,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(),
            vas: await getRepository(Vas).findOne({ domain: context.state.domain, id: ov.vas.id }),
            arrivalNotice: createdArrivalNotice,
            bizplace: context.state.mainBizplace,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(orderVass)

      return createdArrivalNotice
    })
  }
}
