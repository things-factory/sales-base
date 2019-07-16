import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const deletePurchaseOrder = {
  async deletePurchaseOrder(_: any, { name }, context: any) {
    return await getRepository(PurchaseOrder).delete({ domain: context.domain, name })
  }
}
