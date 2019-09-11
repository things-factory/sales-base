import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const confirmArrivalNotice = {
  async confirmArrivalNotice(_: any, { name }, context: any) {
    const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderProducts.product', 'orderVass', 'orderVass.vas', 'creator', 'updater']
    })

    return await getManager().transaction(async transactionalEntityManager => {
      let arrivalNotice: ArrivalNotice
      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
      if (foundArrivalNotice.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. GAN Status change (PENDING => PENDING_RECEIVE)
      arrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
        ...foundArrivalNotice,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      // 2. Check wheter generating collection order is needed.
      if (!foundArrivalNotice.ownTransport) {
        // 2.1 If it's needed. Create Collection Order
        const collectionOrder: CollectionOrder = await transactionalEntityManager.getRepository(CollectionOrder).save({
          name: OrderNoGenerator.collectionOrder(),
          domain: context.state.domain,
          bizplace: context.state.bizplaces[0],
          collectionDateTime: foundArrivalNotice.collectionDateTime,
          from: foundArrivalNotice.from,
          to: foundArrivalNotice.to,
          loadType: foundArrivalNotice.loadType,
          status: ORDER_STATUS.PENDING_RECEIVE
        })

        // 2. 4 Make relation between arrival notice & collection order
        return await transactionalEntityManager.getRepository(ArrivalNotice).update(
          { domain: context.state.domain, name },
          {
            collectionOrder
          }
        )
      }

      return arrivalNotice
    })
  }
}
