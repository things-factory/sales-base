import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const createPurchaseOrder = {
  async createPurchaseOrder(_: any, { purchaseOrder }, context: any) {
    return await getRepository(PurchaseOrder).save({
      domain: context.domain,
      ...purchaseOrder,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
