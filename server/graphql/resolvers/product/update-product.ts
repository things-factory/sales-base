import { getRepository } from 'typeorm'
import { Product } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const updateProduct = {
  async updateProduct(_: any, { name, patch }, context: any) {
    const product = await getRepository(Product).findOne({ domain: context.domain, name })

    if (patch.bizplace && patch.bizplace.id) {
      patch.bizplace = await getRepository(Bizplace).findOne(patch.bizplace.id)
    }

    return await getRepository(Product).save({
      ...product,
      ...patch,
      updater: context.state.user
    })
  }
}
