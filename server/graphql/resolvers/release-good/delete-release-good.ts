import { getManager, In } from 'typeorm'
import { OrderInventory, OrderVas, ReleaseGood, ShippingOrder } from '../../../entities'
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

      if (!foundReleaseOrder) throw new Error(`Arrival notice doesn't exists.`)
      const foundOIs: OrderInventory[] = foundReleaseOrder.orderInventories
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

      // Update locked qty and locked weight of inventories and return id list of order inventories
      const inventoryIds: string[] = foundOIs.map((oi: OrderInventory) => oi.id)

      // Delete order inventories by ids
      if (inventoryIds.length) {
        await trxMgr.getRepository(OrderInventory).delete({ id: In(inventoryIds) })
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
