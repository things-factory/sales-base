import { getRepository, In } from 'typeorm'
import { ProductOption } from '../../../entities'
import { getUserBizplaces } from '@things-factory/biz-base'

export const productOptionResolver = {
  async productOption(_: any, { name }, context: any) {
    return await getRepository(ProductOption).findOne({
      where: { domain: context.domain, name, bizplace: In(await getUserBizplaces(context)) },
      relations: ['domain', 'product', 'productOptionDetails', 'creator', 'updater']
    })
  }
}
