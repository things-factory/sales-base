import { Attachment, deleteAttachment } from '@things-factory/attachment-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getManager, In } from 'typeorm'
import { DeliveryOrder, OrderInventory, OrderVas, ReleaseGood, ShippingOrder } from '../../../entities'

export const deleteReleaseGood = {
  async deleteReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      let foundReleaseOrder: ReleaseGood = await trxMgr.getRepository(ReleaseGood).findOne({
        where: { domain: context.state.domain, name },
        relations: [
          'orderInventories',
          'orderInventories.inventory',
          'orderVass',
          'deliveryOrders',
          'shippingOrder',
          'creator',
          'updater'
        ]
      })

      if (!foundReleaseOrder) throw new Error(`Arrival notice doesn't exists.`)
      const foundDOs: DeliveryOrder[] = foundReleaseOrder.deliveryOrders
      const foundOIs: OrderInventory[] = foundReleaseOrder.orderInventories
      const foundOVs: OrderVas[] = foundReleaseOrder.orderVass
      const foundSO: ShippingOrder = foundReleaseOrder.shippingOrder

      // Update locked qty and locked weight of inventories and return id list of order inventories
      const inventoryIds: string[] = await Promise.all(
        foundOIs.map(async (oi: OrderInventory) => {
          // 1. Update locked weight and locked qty of source inventories
          const inventory: Inventory = oi.inventory
          let lockedQty: number = inventory.lockedQty || 0
          let lockedWeight: number = inventory.lockedWeight || 0
          const releaseQty: number = oi.releaseQty || 0
          const releaseWeight: number = oi.releaseWeight || 0

          await trxMgr.getRepository(Inventory).save({
            ...inventory,
            lockedQty: lockedQty - releaseQty,
            lockedWeight: lockedWeight - releaseWeight,
            updater: context.state.user
          })

          return oi.id
        })
      )

      // Delete order inventories by ids
      if (inventoryIds.length) {
        await trxMgr.getRepository(OrderInventory).delete({ id: In(inventoryIds) })
      }

      // 2. delete order vass
      const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
      if (vasIds.length) {
        await trxMgr.getRepository(OrderVas).delete({ id: In(vasIds) })
      }

      // 3. if there is DO, delete DO
      if (foundDOs) {
        const doIds = foundDOs.map((dos: DeliveryOrder) => dos.id)
        if (doIds.length) {
          await trxMgr.getRepository(DeliveryOrder).delete({ id: In(doIds) })

          // 4. if there is DO, delete attachment
          const foundAttachment: Attachment = await trxMgr.getRepository(Attachment).findOne({
            where: { domain: context.state.domain, refBy: In(doIds) }
          })
          await deleteAttachment(_, { id: foundAttachment.id }, context)
        }
      }

      // 4. if there is SO, delete SO
      if (foundSO) {
        await trxMgr.getRepository(ShippingOrder).delete({ domain: context.state.domain, id: foundSO.id })
      }

      await trxMgr.getRepository(ReleaseGood).delete({ domain: context.state.domain, name })
      return true
    })
  }
}
