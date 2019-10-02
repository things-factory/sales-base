import { Inventory } from '@things-factory/warehouse-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood, shippingOrder, deliveryOrder }, context: any) {
    return await getManager().transaction(async () => {
      const newReleaseGood = releaseGood
      const newShippingOrder = shippingOrder
      const newDeliveryOrder = deliveryOrder
      let orderInventories = releaseGood.orderInventories
      let orderVass = releaseGood.orderVass
      let createdDO
      let createdSO

      if (deliveryOrder) {
        createdDO = await getRepository(DeliveryOrder).save({
          name: OrderNoGenerator.deliveryOrder(),
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          ...newDeliveryOrder,
          creator: context.state.user,
          updater: context.state.user
        })
      }

      if (shippingOrder) {
        createdSO = await getRepository(ShippingOrder).save({
          name: OrderNoGenerator.shippingOrder(),
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          ...newShippingOrder,
          creator: context.state.user,
          updater: context.state.user
        })
      }

      const createdReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
        name: OrderNoGenerator.releaseGood(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        ...newReleaseGood,
        deliveryOrder: createdDO ? createdDO : null,
        shippingOrder: createdSO ? createdSO : null,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create release good inventory
      orderInventories = await Promise.all(
        orderInventories.map(async (orderInventory: OrderInventory) => {
          return {
            ...orderInventory,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            name: OrderNoGenerator.orderInventory(),
            inventory: await getRepository(Inventory).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: orderInventory.inventory.name
              }
            }),
            releaseGood: createdReleaseGood,
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
            releaseGood: createdReleaseGood,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(orderVass)

      return createdReleaseGood
    })
  }
}
