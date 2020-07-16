import { getManager, In } from 'typeorm'
import { OrderInventory, OrderVas, ReleaseGood, ShippingOrder } from '../../../entities'
import { Inventory } from '@things-factory/warehouse-base'
import { Attachment } from '@things-factory/attachment-base'
import { ATTACHMENT_TYPE } from '../../../constants/attachment-type'

export const deleteReleaseGood = {
  async deleteReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      let foundReleaseOrder: ReleaseGood = await trxMgr.getRepository(ReleaseGood).findOne({
        where: { domain: context.state.domain, name },
        relations: [
          'orderInventories',
          'orderInventories.inventory',
          'orderVass',
          'shippingOrder',
          'creator',
          'updater'
        ]
      })

      if (!foundReleaseOrder) throw new Error(`Release order doesn't exists.`)
      let foundOIs: OrderInventory[] = foundReleaseOrder.orderInventories
      const foundOVs: OrderVas[] = foundReleaseOrder.orderVass
      const foundSO: ShippingOrder = foundReleaseOrder.shippingOrder

      let foundAttachment: Attachment
      if (foundReleaseOrder?.ownTransport) {
        foundAttachment = await trxMgr.getRepository(Attachment).findOne({
          where: {
            domain: context.state.domain,
            refBy: foundReleaseOrder.id,
            category: ATTACHMENT_TYPE.DELIVERY_ORDER
          }
        })
      }

      // check if there is inventory id, if yes means select by pallet, need to remove locked qty and weight
      let inventories: Inventory[] = foundOIs.map((oi: OrderInventory) => oi.inventory)

      // Delete inventories by ids
      if (inventories.some(inv => inv !== null)) {
        inventories = inventories.map((inventory: Inventory) => {
          return {
            ...inventory,
            lockedQty: 0,
            lockedWeight: 0,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(Inventory).save(inventories)

        await trxMgr.getRepository(OrderInventory).delete({ id: In(foundOIs.map((oi: OrderInventory) => oi.id)) })
      } else {
        await trxMgr.getRepository(OrderInventory).delete({ id: In(foundOIs.map((oi: OrderInventory) => oi.id)) })
      }

      // 2. delete order vass
      const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
      if (vasIds.length) {
        await trxMgr.getRepository(OrderVas).delete({ id: In(vasIds) })
      }

      // 4. if there is SO, delete SO
      if (foundSO) {
        await trxMgr.getRepository(ShippingOrder).delete({ domain: context.state.domain, id: foundSO.id })
      }

      if (foundAttachment) {
        await trxMgr.getRepository(Attachment).delete({ domain: context.state.domain, id: foundAttachment.id })
      }

      await trxMgr.getRepository(ReleaseGood).delete({ domain: context.state.domain, name })
      return true
    })
  }
}
