import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const updateInvoice = {
  async updateInvoice(_: any, { name, patch }, context: any) {
    const repository = getRepository(Invoice)
    const invoice = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...invoice,
      ...patch,
      updater: context.state.user
    })
  }
}
