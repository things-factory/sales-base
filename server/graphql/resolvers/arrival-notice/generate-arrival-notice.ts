import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { getManager } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, OrderProduct, JobSheet, OrderVas, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'
import { addArrivalNoticeProducts } from './add-arrival-notice-products'
import { generateJobSheet } from '../job-sheet/generate-job-sheet'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { arrivalNotice }, context: any) {
    return await getManager().transaction(async trxMgr => {
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
        updater: context.state.user
      })

      const containerInfo: any = {
        mtDate: arrivalNotice.adviseMtDate,
        containerSize: arrivalNotice.containerSize
      }

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

      // generate job sheet
      const generatedJobSheet: JobSheet = await generateJobSheet(
        context.state.domain,
        context.state.user,
        myBizplace,
        containerInfo,
        trxMgr
      )

      await trxMgr.getRepository(ArrivalNotice).save({
        ...createdArrivalNotice,
        jobSheet: generatedJobSheet,
        updater: context.state.user
      })

      // 3. Create arrival notice vas
      orderVass = await Promise.all(
        orderVass.map(async (ov: OrderVas) => {
          if (ov.targetProduct) {
            ov.targetProduct = await trxMgr.getRepository(Product).findOne(ov.targetProduct.id)
          }

          return {
            ...ov,
            domain: context.state.domain,
            bizplace: myBizplace,
            name: OrderNoGenerator.orderVas(),
            vas: await trxMgr.getRepository(Vas).findOne({ domain: context.state.domain, id: ov.vas.id }),
            type: ORDER_TYPES.ARRIVAL_NOTICE,
            arrivalNotice: createdArrivalNotice,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await trxMgr.getRepository(OrderVas).save(orderVass)

      return createdArrivalNotice
    })
  }
}
