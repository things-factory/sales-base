import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice, CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'

export const receiveArrivalNotice = {
  async receiveArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const arrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name },
          relations: ['collectionOrder', 'orderProducts']
        })

        if (!arrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
        if (arrivalNotice.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products & status of arrival notice  (PENDING_RECEIVE => INTRANSIT)
        arrivalNotice.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { id: orderProduct.id },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.INTRANSIT, updater: context.state.user }
          )
        })

        await getRepository(ArrivalNotice).save({
          ...arrivalNotice,
          status: ORDER_STATUS.INTRANSIT,
          updater: context.state.user
        })

        // 2. Check whether collection order is invloved in.
        if (arrivalNotice.collectionOrder) {
          // 2. 1) if it's yes update status of collection order
          const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
            where: { domain: context.state.domain, name: arrivalNotice.collectionOrder.name }
          })

          await getRepository(CollectionOrder).save({
            ...collectionOrder,
            status: ORDER_STATUS.INTRANSIT,
            updater: context.state.user
          })
        }

        return arrivalNotice
      } catch (e) {
        throw e
      }
    })
  }
}
