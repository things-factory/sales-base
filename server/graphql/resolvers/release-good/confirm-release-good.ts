import { getManager, getRepository } from 'typeorm'
import { DeliveryOrder, ReleaseGood, ShippingOrder } from '../../../entities'
import { ORDER_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const confirmReleaseGood = {
  async confirmReleaseGood(_: any, { name }, context: any) {
    const foundReleaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderProducts.product', 'orderVass', 'orderVass.vas', 'creator', 'updater']
    })

    return await getManager().transaction(async () => {
      let releaseGood: ReleaseGood
      if (!foundReleaseGood) throw new Error(`Release good order doesn't exists.`)
      if (foundReleaseGood.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. Release Goods Status change (PENDING => PENDING_RECEIVE)
      releaseGood = await getRepository(ReleaseGood).save({
        ...foundReleaseGood,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      // 2. Check wheter generating delivery order is needed.
      if (!foundReleaseGood.ownTransport) {
        // 2.1 If it's needed. Create Delivery Order
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).save({
          name: OrderNoGenerator.deliveryOrder(),
          domain: context.state.domain,
          bizplace: context.state.bizplaces[0],
          deliveryDateTime: foundReleaseGood.deliveryDateTime,
          from: foundReleaseGood.from,
          to: foundReleaseGood.to,
          loadType: foundReleaseGood.loadType,
          status: ORDER_STATUS.PENDING_RECEIVE
        })

        // 2. 4 Make relation between release good & delivery order
        return await getRepository(DeliveryOrder).update(
          { domain: context.state.domain, name },
          {
            ...deliveryOrder
          }
        )
      }

      // 2. Check wheter generating shipping order is needed.
      if (!foundReleaseGood.shippingOption) {
        // 2.1 If it's needed. Create Shipping Order
        const shippingOrder: ShippingOrder = await getRepository(ShippingOrder).save({
          name: OrderNoGenerator.shippingOrder(),
          domain: context.state.domain,
          bizplace: context.state.bizplaces[0],
          shipName: foundReleaseGood.shipName,
          containerNo: foundReleaseGood.containerNo,
          from: foundReleaseGood.from,
          to: foundReleaseGood.to,
          status: ORDER_STATUS.PENDING_RECEIVE
        })

        // 2. Make relation between release goods & shipping order
        return await getRepository(ShippingOrder).update(
          { domain: context.state.domain, name },
          {
            ...shippingOrder
          }
        )
      }

      return releaseGood
    })
  }
}
