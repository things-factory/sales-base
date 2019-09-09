import { Bizplace, getUserBizplaces } from '@things-factory/biz-base'
import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const createProductOptionDetail = {
  async createProductOptionDetail(_: any, { productOptionDetail }, context: any) {
    if (productOptionDetail.bizplace && productOptionDetail.bizplace.id) {
      productOptionDetail.bizplace = await getRepository(Bizplace).findOne(productOptionDetail.bizplace.id)
    } else {
      const userBizplaces = await getUserBizplaces(context)
      productOptionDetail.bizplace = userBizplaces[0]
    }

    return await getRepository(ProductOptionDetail).save({
      ...productOptionDetail,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
