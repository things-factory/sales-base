import { getManager, getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'
import { ORDER_STATUS } from '../../../constants'

export const confirmDeliveryOrder = {
  async confirmDeliveryOrder(_: any, { name }, context: any) {
    const foundDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderProducts.product', 'orderVass', 'orderVass.vas', 'creator', 'updater']
    })

    return await getManager().transaction(async () => {
      let deliveryOrder: DeliveryOrder
      if (!foundDeliveryOrder) throw new Error(`Delivery Order doesn't exists.`)
      if (foundDeliveryOrder.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // Collection Order Status change (PENDING => PENDING_RECEIVE)
      deliveryOrder = await getRepository(DeliveryOrder).save({
        ...foundDeliveryOrder,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      return deliveryOrder
    })
  }
}
