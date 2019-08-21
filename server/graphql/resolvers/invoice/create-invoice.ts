import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const createInvoice = {
  async createInvoice(_: any, { invoice }, context: any) {
    return await getRepository(Invoice).save({
      domain: context.domain,
      ...invoice,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
