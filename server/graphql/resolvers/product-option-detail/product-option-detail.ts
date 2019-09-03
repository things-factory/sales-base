import { getRepository, In } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'
import { getUserBizplaces } from '@things-factory/biz-base'

export const productOptionDetailResolver = {
  async productOptionDetail(_: any, { name }, context: any) {
    return await getRepository(ProductOptionDetail).findOne({
      where: { domain: context.state.domain, name, bizplace: In(await getUserBizplaces(context)) },
      relations: ['domain', 'productOption', 'creator', 'updater']
    })
  }
}
