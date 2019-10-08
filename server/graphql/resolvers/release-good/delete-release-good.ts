import { getRepository, In } from 'typeorm'
import { ReleaseGood, DeliveryOrder, OrderInventory, OrderVas } from '../../../entities'
import { Attachment, deleteAttachment } from '@things-factory/attachment-base'

export const deleteReleaseGood = {
  async deleteReleaseGood(_: any, { name }, context: any) {
    let foundReleaseOrder: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderInventories', 'orderVass', 'deliveryOrder', 'creator', 'updater']
    })

    if (!foundReleaseOrder) throw new Error(`Arrival notice doesn't exists.`)
    const foundDO: DeliveryOrder = foundReleaseOrder.deliveryOrder
    const foundOIs: OrderInventory[] = foundReleaseOrder.orderInventories
    const foundOVs: OrderVas[] = foundReleaseOrder.orderVass

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
    if (foundDO) {
      foundReleaseOrder = await getRepository(ReleaseGood).save({ ...foundReleaseOrder, deliveryOrder: null })
      await getRepository(DeliveryOrder).delete({ id: foundDO.id })

      // 4. if there is DO, delete attachment
      const foundAttachment: Attachment = await getRepository(Attachment).findOne({
        where: { domain: context.state.domain, refBy: foundDO.id }
      })
      await deleteAttachment(_, { id: foundAttachment.id }, context)
    }

    await getRepository(ReleaseGood).delete({ domain: context.state.domain, name })
    return true
  }
}
