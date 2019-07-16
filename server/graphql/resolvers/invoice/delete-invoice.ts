import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const deleteInvoice = {
  async deleteInvoice(_: any, { name }, context: any) {
    return await getRepository(Invoice).delete({ domain: context.domain, name })
  }
}
