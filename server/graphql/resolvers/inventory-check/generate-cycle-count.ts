import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager } from 'typeorm'
import { ORDER_STATUS, ORDER_TYPES } from '../../../constants'
import { InventoryCheck } from '../../../entities'
import { OrderNoGenerator } from '../../../utils'

export const generateCycleCountResolver = {
  async generateCycleCount(_: any, { executionDate, customerId }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const { domain, user }: { domain: Domain; user: User } = context.state
      return await generateCycleCount(trxMgr, domain, user, executionDate, customerId)
    })
  }
}

export async function generateCycleCount(
  trxMgr: EntityManager,
  domain: Domain,
  user: User,
  executionDate: string,
  customerId: string
): Promise<InventoryCheck> {
  const customerBizplace: Bizplace = await trxMgr.getRepository(Bizplace).findOne(customerId)

  return trxMgr.getRepository(InventoryCheck).save({
    name: OrderNoGenerator.cycleCount(),
    executionDate,
    type: ORDER_TYPES.CYCLE_COUNT,
    status: ORDER_STATUS.PENDING,
    bizplace: customerBizplace,
    domain,
    updater: user
  })
}
