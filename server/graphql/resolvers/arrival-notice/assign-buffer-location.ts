import { getManager, getRepository, In } from 'typeorm'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { Location } from '@things-factory/warehouse-base'

export const assignBufferLocation = {
  async assignBufferLocation(_: any, { arrivalNotice }, context: any) {
    return await getManager().transaction(async () => {
      const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
        where: {
          domain: context.state.domain,
          bizplace: In(context.state.bizplaces.map(bizplace => bizplace.id)),
          status: ORDER_STATUS.ARRIVED,
          name: arrivalNotice.name
        },
        relations: ['bizplace', 'orderProducts', 'orderVass']
      })

      const orderProducts: OrderProduct[] = foundArrivalNotice.orderProducts
      const orderVass: OrderVas[] = foundArrivalNotice.orderVass

      // 1. Update status of arrival notice (ARRIVED => READY_TO_UNLOAD)
      //    Update buffer location of arrival notice
      await getRepository(ArrivalNotice).save({
        ...foundArrivalNotice,
        status: ORDER_STATUS.READY_TO_UNLOAD,
        bufferLocation: await getRepository(Location).findOne({
          domain: context.state.domain,
          id: arrivalNotice.bufferLocation.id
        }),
        updater: context.state.user
      })

      // 2. Create inventory for buffer location

      // 3. Update status of order products (ARRIVED => READY_TO_UNLOAD)
      await Promise.all(
        orderProducts.map(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).save({
            ...orderProduct,
            status: ORDER_PRODUCT_STATUS.READY_TO_UNLOAD,
            updater: context.state.user
          })
        })
      )

      // 4. Update status of order vass (PENDING => )
      await Promise.all(
        orderVass.map(async (orderVas: OrderVas) => {
          await getRepository(OrderVas).save({
            ...orderVas,
            status: ORDER_VAS_STATUS.READY_TO_PROCESS,
            updater: context.state.user
          })
        })
      )

      return foundArrivalNotice
    })
  }
}
