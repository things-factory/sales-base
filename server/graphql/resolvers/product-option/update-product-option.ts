import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const updateProductOption = {
  async updateProductOption(_: any, { name, patch }, context: any) {
    const productOption = await getRepository(ProductOption).findOne({ domain: context.domain, name })

    if (patch.bizplace && patch.bizplace.id) {
      patch.bizplace = await getRepository(Bizplace).findOne(patch.bizplace.id)
    }

    return await getRepository(ProductOption).save({
      ...productOption,
      ...patch,
      updater: context.state.user
    })
  }
}
