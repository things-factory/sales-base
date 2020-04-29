import { User } from '@things-factory/auth-base'
import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { InventoryCheck } from '../../../entities'
import { ORDER_STATUS } from '../../../constants'

export const generateCycleCountResolver = {
  async generateCycleCount(_: any, { orderNo, executionDate, orderType }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await generateCycleCount(
        orderNo,
        executionDate,
        orderType,
        context.state.domain,
        context.state.user,
        trxMgr
      )
    })
  }
}

export async function generateCycleCount(
  orderNo: any,
  executionDate: any,
  orderType: any,
  domain: Domain,
  user: User,
  trxMgr?: EntityManager
): Promise<InventoryCheck> {
  /**
   * 1. Create Inventory Check Order
   */

  const inventoryCheckRepo: Repository<InventoryCheck> = trxMgr
    ? trxMgr.getRepository(InventoryCheck)
    : getRepository(InventoryCheck)

  const myBizplace: Bizplace = await getMyBizplace(user)

  const cycleCount = inventoryCheckRepo.save({
    name: orderNo,
    executionDate,
    type: orderType,
    status: ORDER_STATUS.PENDING,
    bizplace: myBizplace,
    domain,
    updater: user
  })

  return cycleCount
}
