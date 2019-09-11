import { ArrivalNotice, OrderProduct, OrderVas } from 'server/entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from 'server/enum'
import { getManager } from 'typeorm'

export const assignBufferLocation = {
  async assignBufferLocation(_: any, { name, location }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      // 1. Check status validity of arrival notice
      const arrivalNotice: ArrivalNotice = await transactionalEntityManager
        .getRepository(ArrivalNotice)
        .findOne({ where: { domain: context.state.domain, name }, relations: ['orderProducts', 'orderVass'] })

      if (!arrivalNotice) throw new Error(`arrival notice doesn't exists.`)
      if (arrivalNotice.status !== ORDER_STATUS.ARRIVED)
        throw new Error('Status is not suitable for assigning buffer location')

      // 2. Update status of arrival notice
      await transactionalEntityManager.getRepository(ArrivalNotice).save({
        ...arrivalNotice,
        status: ORDER_STATUS.READY_TO_UNLOAD,
        updater: context.state.user
      })

      // 3. Update status of order products & order vas
      // 3. 1) update status of order products
      arrivalNotice.orderProducts.forEach(async (orderProduct: OrderProduct) => {
        await transactionalEntityManager
          .getRepository(OrderProduct)
          .update(
            { id: orderProduct.id },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.READY_TO_UNLOAD, updater: context.state.user }
          )
      })

      // 3. 2) update status of order vass
      arrivalNotice.orderVass.forEach(async (orderVas: OrderVas) => {
        await transactionalEntityManager
          .getRepository(OrderVas)
          .update(
            { id: orderVas.id },
            { ...orderVas, status: ORDER_VAS_STATUS.READY_TO_PROCESS, updater: context.state.user }
          )
      })

      return arrivalNotice
    })
  }
}
