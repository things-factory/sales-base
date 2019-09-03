import { getRepository } from 'typeorm'
import { Product } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'
import { getUserBizplaces } from '@things-factory/biz-base'

export const createProduct = {
  async createProduct(_: any, { product }, context: any) {
    if (product.bizplace && product.bizplace.id) {
      product.bizplace = await getRepository(Bizplace).findOne(product.bizplace.id)
    } else {
      const userBizplaces = await getUserBizplaces(context)
      product.bizplace = userBizplaces[0]
    }

    if (product.refTo && product.refTo.id) {
      product.refTo = await getRepository(Product).findOne(product.refTo.id)
    }

    return await getRepository(Product).save({
      ...product,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
