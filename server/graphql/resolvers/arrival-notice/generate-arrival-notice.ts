import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { getManager } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, OrderProduct, OrderVas, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'
import { addArrivalNoticeProducts } from './add-arrival-notice-products'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { arrivalNotice }, context: any) {
    return await getManager().transaction(async (trxMgr) => {
      let orderProducts: OrderProduct[] = arrivalNotice.orderProducts
      let orderVass: OrderVas[] = arrivalNotice.orderVass
      const myBizplace: Bizplace = await getMyBizplace(context.state.user)

      // Validation for duplication of batch id and product pair
      // case 1. batch id is not duplicated => OK
      // case 2. batch id is duplicated and product also same with previous one => OK
      // case 3. batch id is duplicated but product is not same with previous one => Not OK
      // const duplicatedInventory: Inventory = await trxMgr.getRepository(Inventory).findOne({
      //   where: orderProducts.map((orderProduct: OrderProduct) => {
      //     return {
      //       bizplace: myBizplace,
      //       domain: context.state.domain,
      //       batchId: orderProduct.batchId,
      //       product: Not(Equal(orderProduct.product.id))
      //     }
      //   })
      // })

      // if (duplicatedInventory) throw new Error(`Batch id is duplicated. (${duplicatedInventory.batchId})`)

      // 1. Create arrival notice
      const createdArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).save({
        ...arrivalNotice,
        name: OrderNoGenerator.arrivalNotice(),
        domain: context.state.domain,
        bizplace: myBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user,
      })

      // 2. Create arrival notice product
      await addArrivalNoticeProducts(
        context.state.domain,
        createdArrivalNotice,
        orderProducts.map((op: OrderProduct) => {
          return { ...op, status: ORDER_PRODUCT_STATUS.PENDING }
        }),
        context.state.user,
        trxMgr
      )

      // 3. Create arrival notice vas
      orderVass = await Promise.all(
        orderVass.map(async (ov: OrderVas) => {
          if (ov.targetProduct) {
            ov.targetProduct = await trxMgr.getRepository(Product).findOne(ov.targetProduct.id)
          }

          return {
            ...ov,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(),
            vas: await trxMgr.getRepository(Vas).findOne({ domain: context.state.domain, id: ov.vas.id }),
            arrivalNotice: createdArrivalNotice,
            bizplace: myBizplace,
            type: ORDER_TYPES.ARRIVAL_NOTICE,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user,
          }
        })
      )
      await trxMgr.getRepository(OrderVas).save(orderVass)

      return createdArrivalNotice
    })
  },
}
