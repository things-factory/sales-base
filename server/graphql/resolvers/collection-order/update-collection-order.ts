import { getRepository, In } from 'typeorm'
import { Bizplace } from '@things-factory/biz-base'
import { CollectionOrder } from '../../../entities'

export const updateCollectionOrder = {
  async updateCollectionOrder(_: any, { name, patch }, context: any) {
    const collectionOrder = await getRepository(CollectionOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      }
    })

    return await getRepository(CollectionOrder).save({
      ...collectionOrder,
      ...patch,
      updater: context.state.user
    })
  }
}
