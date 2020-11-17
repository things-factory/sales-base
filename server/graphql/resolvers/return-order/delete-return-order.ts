import { Attachment } from '@things-factory/attachment-base'
import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager, In } from 'typeorm'
import { ATTACHMENT_TYPE } from '../../../constants/attachment-type'
import { OrderInventory, OrderVas, ReturnOrder } from '../../../entities'

export const deleteReturnOrderResolver = {
  async deleteReturnOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      return await deleteReturnOrder(trxMgr, name, context)
    })
  }
}
export async function deleteReturnOrder(trxMgr: EntityManager, name: string, context: any): Promise<boolean> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  let foundReturnOrder: ReturnOrder = await trxMgr.getRepository(ReturnOrder).findOne({
    where: { domain, name },
    relations: ['orderInventories', 'orderInventories.inventory', 'orderVass', 'creator', 'updater']
  })

  if (!foundReturnOrder) throw new Error(`Return Order doesn't exists.`)
  const foundOIs: OrderInventory[] = foundReturnOrder.orderInventories
  const foundOVs: OrderVas[] = foundReturnOrder.orderVass

  let foundAttachment: Attachment
  if (foundReturnOrder?.ownTransport) {
    foundAttachment = await trxMgr.getRepository(Attachment).findOne({
      where: {
        domain,
        refBy: foundReturnOrder.id,
        category: ATTACHMENT_TYPE.RETURN_ORDER
      }
    })
  }

  // Update locked qty and locked stdUnitValue of inventories and return id list of order inventories
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

  if (foundAttachment) {
    await trxMgr.getRepository(Attachment).delete({ domain, id: foundAttachment.id })
  }

  await trxMgr.getRepository(ReturnOrder).delete({ domain, name })
  return true
}
