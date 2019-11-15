import { Inventory } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'
import { ORDER_INVENTORY_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, OrderVas, ReleaseGood, ShippingOrder } from '../../../entities'

export const rejectReleaseGood = {
  async rejectReleaseGood(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const releaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.PENDING_RECEIVE },
          relations: ['orderInventories', 'orderInventories.inventory', 'orderVass', 'shippingOrder', 'deliveryOrders']
        })

        if (!releaseGood) throw new Error(`Release good doesn't exists.`)
        if (!patch.remark) throw new Error('Remark is not exist.')

        let foundOIs: OrderInventory[] = releaseGood.orderInventories
        let foundOVs: OrderVas[] = releaseGood.orderVass
        let foundDOs: DeliveryOrder[] = releaseGood.deliveryOrders

        // 1. Update status of order products (PENDING_RECEIVE => REJECTED)
        if (foundOIs && foundOIs.length) {
          foundOIs = await Promise.all(
            foundOIs.map(async (oi: OrderInventory) => {
              const inventory: Inventory = oi.inventory
              // 1. Update locked weight and locked qty of source inventories
              let lockedQty: number = inventory.lockedQty || 0
              let lockedWeight: number = inventory.lockedWeight || 0
              const releaseQty: number = oi.releaseQty
              const releaseWeight: number = oi.releaseWeight

              if (releaseQty > 0) lockedQty = lockedQty - releaseQty
              if (releaseWeight > 0) lockedWeight = lockedWeight - releaseWeight

              // Update locked qty and locked weight of inventories and return id list of order inventories
              await trxMgr.getRepository(Inventory).save({
                ...inventory,
                lockedQty,
                lockedWeight,
                updater: context.state.user
              })

              return {
                ...oi,
                status: ORDER_INVENTORY_STATUS.REJECTED,
                updater: context.state.user
              }
            })
          )

          await trxMgr.getRepository(OrderInventory).save(foundOIs)
        }

        // 2. Update status of order vass if it exists (PENDING_RECEIVE => REJECTED)
        if (foundOVs && foundOVs.length) {
          foundOVs = foundOVs.map((ov: OrderVas) => {
            return {
              ...ov,
              status: ORDER_VAS_STATUS.REJECTED,
              updater: context.state.user
            }
          })
          await trxMgr.getRepository(OrderVas).save(foundOVs)
        }

        if (foundDOs) {
          foundDOs = foundDOs.map((dos: DeliveryOrder) => {
            return {
              ...dos,
              status: ORDER_STATUS.REJECTED,
              updater: context.state.user
            }
          })
          await trxMgr.getRepository(DeliveryOrder).save(foundDOs)
        }

        if (releaseGood.shippingOrder) {
          // 2. 1) if it's yes update status of collection order
          const shippingOrder: ShippingOrder = await trxMgr.getRepository(ShippingOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.shippingOrder.name }
          })

          await trxMgr.getRepository(ShippingOrder).save({
            ...shippingOrder,
            status: ORDER_STATUS.REJECTED,
            updater: context.state.user
          })
        }

        await trxMgr.getRepository(ReleaseGood).save({
          ...releaseGood,
          ...patch,
          status: ORDER_STATUS.REJECTED,
          updater: context.state.user
        })

        return releaseGood
      } catch (e) {
        throw e
      }
    })
  }
}
