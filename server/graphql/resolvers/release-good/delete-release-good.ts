import { Attachment } from '@things-factory/attachment-base'
import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Inventory } from '@things-factory/warehouse-base'
import { EntityManager, getManager, In } from 'typeorm'
import { ATTACHMENT_TYPE } from '../../../constants/attachment-type'
import { ArrivalNotice, OrderInventory, OrderVas, ReleaseGood, ShippingOrder } from '../../../entities'
import { deleteArrivalNotice } from '../arrival-notice/delete-arrival-notice'

export const deleteReleaseGoodResolver = {
  async deleteReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      return await deleteReleaseGood(trxMgr, name, context)
    })
  }
}
export async function deleteReleaseGood(trxMgr: EntityManager, name: string, context: any): Promise<boolean> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  let foundReleaseOrder: ReleaseGood = await trxMgr.getRepository(ReleaseGood).findOne({
    where: { domain, name },
    relations: [
      'arrivalNotice',
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
        domain,
        refBy: foundReleaseOrder.id,
        category: ATTACHMENT_TYPE.DELIVERY_ORDER
      }
    })
  }

  // Update locked qty and locked uomValue of inventories and return id list of order inventories
  const inventoryIds: string[] = foundOIs.map((oi: OrderInventory) => oi.id)

  // Delete order inventories by ids
  if (inventoryIds.length) {
    foundOIs.map(async (oi: OrderInventory) => {
      if (oi?.inventory?.id) {
        oi.inventory = await trxMgr.getRepository(Inventory).findOne(oi.inventory.id)

        await trxMgr.getRepository(Inventory).save({
          ...oi.inventory,
          lockedQty: oi.inventory.lockedQty - oi.releaseQty,
          lockedUomValue: oi.inventory.lockedUomValue - oi.releaseUomValue,
          updater: user
        })
      }
      return oi
    })
    await trxMgr.getRepository(OrderInventory).delete({ id: In(inventoryIds) })
  }

  // 2. delete order vass
  const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
  if (vasIds.length) {
    await trxMgr.getRepository(OrderVas).delete({ id: In(vasIds) })
  }

  // 4. if there is SO, delete SO
  if (foundSO) {
    await trxMgr.getRepository(ShippingOrder).delete({ domain, id: foundSO.id })
  }

  if (foundAttachment) {
    await trxMgr.getRepository(Attachment).delete({ domain, id: foundAttachment.id })
  }

  // 5. Remove relation with GAN if it's cross docking
  if (foundReleaseOrder.crossDocking && foundReleaseOrder.arrivalNotice?.id) {
    let arrivalNotice: ArrivalNotice = foundReleaseOrder.arrivalNotice
    arrivalNotice.releaseGood = null
    arrivalNotice = await trxMgr.getRepository(ArrivalNotice).save(arrivalNotice)

    await trxMgr.getRepository(ReleaseGood).delete({ domain, name })
    await deleteArrivalNotice(trxMgr, arrivalNotice.name, context)
  } else {
    await trxMgr.getRepository(ReleaseGood).delete({ domain, name })
  }
  return true
}
