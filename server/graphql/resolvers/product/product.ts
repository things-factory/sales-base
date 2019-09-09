import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const productResolver = {
  async product(_: any, { name }, context: any) {
    return await getRepository(Product).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: ['domain', 'bizplace', 'productOptions', 'creator', 'updater']
    })
  }
}
