import { Attachment, deleteAttachment } from '@things-factory/attachment-base'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder, OrderInventory, OrderVas, ReleaseGood, ShippingOrder } from '../../../entities'

export const deleteReleaseGood = {
  async deleteReleaseGood(_: any, { name }, context: any) {
    let foundReleaseOrder: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderInventories', 'orderVass', 'deliveryOrders', 'shippingOrder', 'creator', 'updater']
    })

    if (!foundReleaseOrder) throw new Error(`Arrival notice doesn't exists.`)
    const foundDOs: DeliveryOrder[] = foundReleaseOrder.deliveryOrders
    const foundOIs: OrderInventory[] = foundReleaseOrder.orderInventories
    const foundOVs: OrderVas[] = foundReleaseOrder.orderVass
    const foundSO: ShippingOrder = foundReleaseOrder.shippingOrder

    // 1. delete order inventories
    const inventoryIds = foundOIs.map((oi: OrderInventory) => oi.id)
    if (inventoryIds.length) {
      await getRepository(OrderInventory).delete({ id: In(inventoryIds) })
    }

    // 2. delete order vass
    const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
    if (vasIds.length) {
      await getRepository(OrderVas).delete({ id: In(vasIds) })
    }

    // 3. if there is DO, delete DO
    if (foundDOs) {
      const doIds = foundDOs.map((dos: DeliveryOrder) => dos.id)
      if (doIds.length) {
        await getRepository(DeliveryOrder).delete({ id: In(doIds) })

        // 4. if there is DO, delete attachment
        const foundAttachment: Attachment = await getRepository(Attachment).findOne({
          where: { domain: context.state.domain, refBy: In(doIds) }
        })
        await deleteAttachment(_, { id: foundAttachment.id }, context)
      }
    }

    // 4. if there is SO, delete SO
    if (foundSO) {
      await getRepository(ShippingOrder).delete({ domain: context.state.domain, id: foundSO.id })
    }

    await getRepository(ReleaseGood).delete({ domain: context.state.domain, name })
    return true
  }
}
