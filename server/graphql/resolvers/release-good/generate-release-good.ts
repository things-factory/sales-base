import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ORDER_INVENTORY_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants/order'
import { OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood, shippingOrder }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const myBizplace: Bizplace = await getMyBizplace(context.state.user)
      let orderInventories: OrderInventory[] = releaseGood.orderInventories
      let orderVass: OrderVas[] = releaseGood.orderVass
      let createdSO: ShippingOrder

      if (shippingOrder) {
        createdSO = await trxMgr.getRepository(ShippingOrder).save({
          ...shippingOrder,
          name: OrderNoGenerator.shippingOrder(),
          domain: context.state.domain,
          bizplace: myBizplace,
          status: ORDER_STATUS.PENDING,
          creator: context.state.user,
          updater: context.state.user
        })
      }

      const createdReleaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).save({
        ...releaseGood,
        name: OrderNoGenerator.releaseGood(),
        shippingOrder: createdSO,
        domain: context.state.domain,
        bizplace: myBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      orderInventories = await Promise.all(
        orderInventories.map(async (orderInventory: OrderInventory) => {
          // 1. Update locked qty and locked weight of inventories
          const inventory: Inventory = await trxMgr.getRepository(Inventory).findOne(orderInventory.inventory.id)
          let lockedQty: number = inventory.lockedQty || 0
          let lockedWeight: number = inventory.lockedWeight || 0
          const releaseQty: number = orderInventory.releaseQty || 0
          const releaseWeight: number = orderInventory.releaseWeight || 0

          await trxMgr.getRepository(Inventory).save({
            ...inventory,
            lockedQty: lockedQty + releaseQty,
            lockedWeight: lockedWeight + releaseWeight,
            updater: context.state.user
          })

          return {
            ...orderInventory,
            domain: context.state.domain,
            bizplace: myBizplace,
            status: ORDER_INVENTORY_STATUS.PENDING,
            name: OrderNoGenerator.orderInventory(),
            inventory: await trxMgr.getRepository(Inventory).findOne(orderInventory.inventory.id),
            releaseGood: createdReleaseGood,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await trxMgr.getRepository(OrderInventory).save(orderInventories)

      if (orderVass && orderVass.length) {
        orderVass = await Promise.all(
          orderVass.map(async (orderVas: OrderVas) => {
            return {
              ...orderVas,
              domain: context.state.domain,
              bizplace: myBizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await trxMgr.getRepository(Vas).findOne(orderVas.vas.id),
              inventory: await trxMgr.getRepository(Inventory).findOne(orderVas.inventory.id),
              type: ORDER_TYPES.RELEASE_OF_GOODS,
              releaseGood: createdReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await trxMgr.getRepository(OrderVas).save(orderVass)
      }

      return createdReleaseGood
    })
  }
}
