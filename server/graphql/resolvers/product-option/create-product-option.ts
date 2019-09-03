import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'
import { Bizplace, getUserBizplaces } from '@things-factory/biz-base'

export const createProductOption = {
  async createProductOption(_: any, { productOption }, context: any) {
    if (productOption.bizplace && productOption.bizplace.id) {
      productOption.bizplace = await getRepository(Bizplace).findOne(productOption.bizplace.id)
    } else {
      const userBizplaces = await getUserBizplaces(context)
      productOption.bizplace = userBizplaces[0]
    }

    return await getRepository(ProductOption).save({
      ...productOption,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
