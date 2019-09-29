import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice, OrderProduct, CollectionOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'

export const rejectArrivalNotice = {
  async rejectArrivalNotice(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const arrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts', 'collectionOrder']
        })

        if (!arrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
        if (!patch.remark) throw new Error('Remark is not exist.')
        if (arrivalNotice.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (PENDING_RECEIVE => READY_TO_COLLECT)
        arrivalNotice.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.REJECTED, updater: context.state.user }
          )
        })

        if (arrivalNotice.collectionOrder) {
          // 2. 1) if it's yes update status of collection order
          const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
            where: { domain: context.state.domain, name: arrivalNotice.collectionOrder.name }
          })

          await getRepository(CollectionOrder).save({
            ...collectionOrder,
            status: ORDER_STATUS.REJECTED,
            updater: context.state.user
          })
        }

        await getRepository(ArrivalNotice).save({
          ...arrivalNotice,
          ...patch,
          status: ORDER_STATUS.REJECTED,
          updater: context.state.user
        })

        return arrivalNotice
      } catch (e) {
        throw e
      }
    })
  }
}
