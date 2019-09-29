import { getManager, getRepository, In } from 'typeorm'
import { Inventory } from '@things-factory/warehouse-base'
import { OrderVas, ReleaseGood, Vas, OrderInventory, ShippingOrder, DeliveryOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editReleaseGood = {
  async editReleaseGood(_: any, { name, releaseGood, shippingOrder, deliveryOrder }, context: any) {
    let orderInventories = releaseGood.orderInventories
    let orderVass = releaseGood.orderVass
    const updatedShippingOrder = shippingOrder
    const updatedDeliveryOrder = deliveryOrder

    const foundReleaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderInventories', 'orderVass', 'deliveryOrder', 'shippingOrder', 'creator', 'updater']
    })

    try {
      if (!foundReleaseGood) throw new Error(`Release good doesn't exists.`)
      if (foundReleaseGood.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async () => {
        if (releaseGood.ownTransport && !releaseGood.shippingOption) {
          await getRepository(ReleaseGood).save({
            ...foundReleaseGood,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            deliveryOrder: null,
            shippingOrder: null,
            updater: context.state.user
          })

          const shippingOrderId = foundReleaseGood.shippingOrder.id
          await getRepository(ShippingOrder).delete({
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            id: shippingOrderId
          })

          const deliveryOrderId = foundReleaseGood.deliveryOrder.id
          await getRepository(DeliveryOrder).delete({
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            id: deliveryOrderId
          })
        } else if (releaseGood.ownTransport && releaseGood.shippingOption) {
          await getRepository(ReleaseGood).save({
            ...foundReleaseGood,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            deliveryOrder: null,
            updater: context.state.user
          })

          const deliveryOrderId = foundReleaseGood.deliveryOrder.id
          await getRepository(DeliveryOrder).delete({
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            id: deliveryOrderId
          })

          await getRepository(ShippingOrder).save({
            ...foundReleaseGood.shippingOrder,
            from: releaseGood.from,
            to: releaseGood.to,
            loadType: releaseGood.loadType,
            ...updatedShippingOrder,
            updater: context.state.user
          })
        } else if (!releaseGood.ownTransport && !releaseGood.shippingOption) {
          await getRepository(ReleaseGood).save({
            ...foundReleaseGood,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            shippingOrder: null,
            updater: context.state.user
          })

          const shippingOrderId = foundReleaseGood.shippingOrder.id
          await getRepository(ShippingOrder).delete({
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            id: shippingOrderId
          })

          await getRepository(DeliveryOrder).save({
            ...foundReleaseGood.deliveryOrder,
            from: releaseGood.from,
            to: releaseGood.to,
            loadType: releaseGood.loadType,
            ...updatedDeliveryOrder,
            updater: context.state.user
          })
        } else if (!releaseGood.ownTransport && releaseGood.shippingOption) {
          await getRepository(DeliveryOrder).save({
            ...foundReleaseGood.deliveryOrder,
            from: releaseGood.from,
            to: releaseGood.to,
            loadType: releaseGood.loadType,
            ...updatedDeliveryOrder,
            updater: context.state.user
          })

          await getRepository(ShippingOrder).save({
            ...foundReleaseGood.shippingOrder,
            from: releaseGood.from,
            to: releaseGood.to,
            loadType: releaseGood.loadType,
            ...updatedShippingOrder,
            updater: context.state.user
          })
        }
        // 1. delete order products
        const orderInventoryIds = foundReleaseGood.orderInventories.map(inventory => inventory.id)
        await getRepository(OrderInventory).delete({ id: In(orderInventoryIds) })

        // 2. delete order vass
        const orderVasIds = foundReleaseGood.orderVass.map(vas => vas.id)
        await getRepository(OrderVas).delete({ id: In(orderVasIds) })

        // 5. update arrival notice
        const updatedReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
          ...foundReleaseGood,
          ...releaseGood,
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          updater: context.state.user
        })

        // 2. Create release good inventory
        orderInventories = await Promise.all(
          orderInventories.map(async (inventory: OrderInventory) => {
            return {
              ...inventory,
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: OrderNoGenerator.orderInventory(),
              inventory: await getRepository(Inventory).findOne({
                where: {
                  domain: context.state.domain,
                  bizplace: context.state.mainBizplace,
                  name: releaseGood.name
                }
              }),
              releaseGood: updatedReleaseGood,
              status: ORDER_PRODUCT_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderInventory).save(orderInventories)

        // 3. Create arrival notice vas
        orderVass = await Promise.all(
          orderVass.map(async (vas: OrderVas) => {
            return {
              ...vas,
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await getRepository(Vas).findOne(vas.vas.id),
              releaseGood: updatedReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderVas).save(orderVass)

        return updatedReleaseGood
      })
    } catch (e) {
      throw e
    }
  }
}
