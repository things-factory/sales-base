import { Product } from '@things-factory/product-base'
import { getManager, getRepository, In } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editArrivalNotice = {
  async editArrivalNotice(_: any, { name, arrivalNotice, collectionOrder }, context: any) {
    return await getManager().transaction(async () => {
      let newOrderProducts: OrderProduct[] = arrivalNotice.orderProducts
      let newOrderVass: OrderVas[] = arrivalNotice.orderVass

      const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
        where: { domain: context.state.domain, name, status: ORDER_STATUS.EDITING },
        relations: ['orderProducts', 'orderVass', 'collectionOrder', 'creator', 'updater']
      })

      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
      const foundCO: CollectionOrder = foundArrivalNotice.collectionOrder
      const foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
      const foundVOs: OrderVas[] = foundArrivalNotice.orderVass

      // 1. delete order products
      await getRepository(OrderProduct).delete({ id: In(foundOPs.map(product => product.id)) })

      // 2. delete order vass
      await getRepository(OrderVas).delete({ id: In(foundVOs.map(vas => vas.id)) })

      // 3. delete collection order if it's exists
      if (foundCO) await getRepository(CollectionOrder).delete({ id: foundCO.id })

      // 4. Create collection order
      if (collectionOrder) {
        arrivalNotice.collectionOrder = await getRepository(CollectionOrder).save({
          ...collectionOrder,
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          name: OrderNoGenerator.collectionOrder(),
          status: ORDER_STATUS.PENDING,
          creator: context.state.user,
          updater: context.state.user
        })
      }

      // 5. update arrival notice
      const updatedArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).save({
        ...foundArrivalNotice,
        ...arrivalNotice,
        status: ORDER_STATUS.PENDING,
        updater: context.state.user
      })

      // 5. Create arrival notice product
      newOrderProducts = await Promise.all(
        newOrderProducts.map(async (op: OrderProduct) => {
          return {
            ...op,
            domain: context.state.domain,
            name: OrderNoGenerator.orderProduct(),
            product: await getRepository(Product).findOne({ domain: context.state.domain, id: op.product.id }),
            arrivalNotice: updatedArrivalNotice,
            bizplace: context.state.mainBizplace,
            type: ORDER_TYPES.ARRIVAL_NOTICE,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderProduct).save(newOrderProducts)

      // 5. Create arrival notice vas
      newOrderVass = await Promise.all(
        newOrderVass.map(async (ov: OrderVas) => {
          return {
            ...ov,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(),
            vas: await getRepository(Vas).findOne({ domain: context.state.domain, id: ov.vas.id }),
            arrivalNotice: updatedArrivalNotice,
            bizplace: context.state.mainBizplace,
            type: ORDER_TYPES.ARRIVAL_NOTICE,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(newOrderVass)

      return updatedArrivalNotice
    })
  }
}
