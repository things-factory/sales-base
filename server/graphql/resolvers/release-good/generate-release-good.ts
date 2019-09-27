import { Inventory } from '@things-factory/warehouse-base'
import { getManager, getRepository } from 'typeorm'
import { DeliveryOrder, OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood }, context: any) {
    return await getManager().transaction(async () => {
      const newReleaseGood = releaseGood.releaseGood
      let inventories = releaseGood.inventories
      let vass = releaseGood.vass

      // 1. Create release good
      const createdReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
        name: OrderNoGenerator.releaseGood(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        ...newReleaseGood,
        creator: context.state.user,
        updater: context.state.user
      })

      if (!newReleaseGood.ownTransport) {
        await getRepository(DeliveryOrder).save({
          name: OrderNoGenerator.deliveryOrder(),
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          deliveryDateTime: newReleaseGood.deliveryDateTime,
          from: newReleaseGood.from,
          to: newReleaseGood.to,
          loadType: newReleaseGood.loadType,
          status: ORDER_STATUS.PENDING
        })
      }

      if (!newReleaseGood.shippingOption) {
        await getRepository(ShippingOrder).save({
          name: OrderNoGenerator.shippingOrder(),
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          shipName: newReleaseGood.shipName,
          containerNo: newReleaseGood.containerNo,
          containerArrivalDate: newReleaseGood.containerArrivalDate,
          containerLeavingDate: newReleaseGood.containerLeavingDate,
          from: newReleaseGood.from,
          to: newReleaseGood.to,
          status: ORDER_STATUS.PENDING
        })
      }

      // 2. Create release good inventory
      inventories = await Promise.all(
        inventories.map(async (inventory: OrderInventory) => {
          return {
            ...inventory,
            domain: context.state.domain,
            name: OrderNoGenerator.orderInventory(),
            inventory: await getRepository(Inventory).findOne(inventory.inventory.id),
            releaseGood: createdReleaseGood,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderInventory).save(inventories)

      // 3. Create arrival notice vas
      vass = await Promise.all(
        vass.map(async (vas: OrderVas) => {
          return {
            ...vas,
            domain: context.state.domain,
            name: OrderNoGenerator.releaseVas(),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            releaseGood: createdReleaseGood,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(vass)

      return createdReleaseGood
    })
  }
}
