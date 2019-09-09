import { Bizplace } from '@things-factory/biz-base'
import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const updateProductOptionDetail = {
  async updateProductOptionDetail(_: any, { name, patch }, context: any) {
    const productOptionDetail = await getRepository(ProductOptionDetail).findOne({ domain: context.state.domain, name })

    if (patch.bizplace && patch.bizplace.id) {
      patch.bizplace = await getRepository(Bizplace).findOne(patch.bizplace.id)
    }

    return await getRepository(ProductOptionDetail).save({
      ...productOptionDetail,
      ...patch,
      updater: context.state.user
    })
  }
}
