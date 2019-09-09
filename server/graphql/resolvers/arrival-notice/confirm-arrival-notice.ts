import { getManager, getRepository } from 'typeorm'
import uuid from 'uuid/v4'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'

export const confirmArrivalNotice = {
  async confirmArrivalNotice(_: any, { name }, context: any) {
    const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderProducts.product', 'orderVass', 'orderVass.vas', 'creator', 'updater']
    })

    return await getManager().transaction(async transactionalEntityManager => {
      let arrivalNotice
      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
      if (foundArrivalNotice.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. GAN Status change (PENDING => PENDING_RECEIVE)
      arrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
        ...foundArrivalNotice,
        status: ORDER_STATUS.PENDING_RECIEVE,
        updater: context.state.user
      })

      // 2. Check wheter generating collection order is needed.
      if (!foundArrivalNotice.ownTransport) {
        // 2.1 If it's needed. Create Collection Order
        const collectionOrder: CollectionOrder = await transactionalEntityManager.getRepository(CollectionOrder).save({
          name: uuid(),
          domain: context.state.domain,
          bizplace: context.state.bizplaces[0],
          collectionDateTime: foundArrivalNotice.collectionDateTime,
          from: foundArrivalNotice.from,
          loadType: foundArrivalNotice.loadType,
          status: ORDER_STATUS.PENDING_RECIEVE
        })

        // 2.2 Create order product
        const products = foundArrivalNotice.orderProducts.map((product: OrderProduct) => {
          delete product.id
          delete product.arrivalNotice

          return {
            ...product,
            domain: context.state.domain,
            name: `${collectionOrder.name}-${product.batchId}-${product.seq}`,
            collectionOrder,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })

        await transactionalEntityManager.getRepository(OrderProduct).save(products)

        // 2. 3 Create order vas
        const vass = foundArrivalNotice.orderVass.map((vas: OrderVas) => {
          delete vas.id
          delete vas.arrivalNotice

          return {
            ...vas,
            domain: context.state.domain,
            name: `${collectionOrder.name}-${vas.batchId}-${vas.vas.name}`,
            collectionOrder,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })

        await transactionalEntityManager.getRepository(OrderVas).save(vass)

        // 2. 4 Make relation between arrival notice & collection order

        arrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
          ...foundArrivalNotice,
          collectionOrder
        })
      }

      return arrivalNotice
    })
  }
}
