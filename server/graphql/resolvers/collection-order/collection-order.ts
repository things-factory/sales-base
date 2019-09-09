import { getRepository, In } from 'typeorm'
import { Bizplace } from '@things-factory/biz-base'
import { CollectionOrder } from '../../../entities'

export const collectionOrderResolver = {
  async collectionOrder(_: any, { name }, context: any) {
    return await getRepository(CollectionOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplace.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: ['domain', 'bizplace', 'orderProducts', 'orderVass', 'orderVass.vas', 'creator', 'updater']
    })
  }
}
