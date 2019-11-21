import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const updateCollectionOrder = {
  async updateCollectionOrder(_: any, { name, patch }, context: any) {
    const collectionOrder = await getRepository(CollectionOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      }
    })

    return await getRepository(CollectionOrder).save({
      ...collectionOrder,
      ...patch,
      updater: context.state.user
    })
  }
}
