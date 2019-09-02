import { getUserBizplaces } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const productResolver = {
  async product(_: any, { name }, context: any) {
    return await getRepository(Product).findOne({
      where: { domain: context.domain, name, bizplace: In(await getUserBizplaces(context)) },
      relations: ['domain', 'bizplace', 'refTo', 'aliases', 'options', 'batches', 'creator', 'updater']
    })
  }
}
