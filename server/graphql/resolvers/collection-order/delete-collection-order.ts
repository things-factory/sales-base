import { getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const deleteCollectionOrder = {
  async deleteCollectionOrder(_: any, { name }) {
    await getRepository(CollectionOrder).delete(name)
    return true
  }
}
