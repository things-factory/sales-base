import { getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const createCollectionOrder = {
  async createCollectionOrder(_, { collectionOrder }, context: any) {
    return await getRepository(CollectionOrder).save({
      ...collectionOrder,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
