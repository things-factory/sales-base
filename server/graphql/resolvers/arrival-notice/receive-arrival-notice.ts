import { getManager } from 'typeorm'
import { ArrivalNotice, CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const receiveArrivalNotice = {
  async receiveArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      try {
        const arrivalNotice: ArrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name },
          relations: ['collectionOrder', 'orderProducts']
        })

        if (!arrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
        if (arrivalNotice.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of arrival notice & status of products (PENDING_RECEIVE => INTRANSIT)
        arrivalNotice.orderProducts = arrivalNotice.orderProducts.map((orderProduct: OrderProduct) => {
          return { ...orderProduct, status: ORDER_PRODUCT_STATUS.INTRANSIT }
        })

        await transactionalEntityManager.getRepository(ArrivalNotice).save({
          ...arrivalNotice,
          status: ORDER_STATUS.INTRANSIT,
          updater: context.state.user
        })

        // 2. Check whether collection order is invloved in.
        if (arrivalNotice.collectionOrder) {
          const collectionOrder: CollectionOrder = await transactionalEntityManager
            .getRepository(CollectionOrder)
            .findOne({
              where: { domain: context.state.domain, name: arrivalNotice.collectionOrder.name },
              relations: ['orderProducts']
            })
          collectionOrder.orderProducts = collectionOrder.orderProducts.map((orderProduct: OrderProduct) => {
            return { ...orderProduct, status: ORDER_PRODUCT_STATUS.INTRANSIT }
          })

          await transactionalEntityManager.getRepository(CollectionOrder).save({
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
