import { collectionOrderResolver } from './collection-order'
import { collectionOrdersResolver } from './collection-orders'

import { updateCollectionOrder } from './update-collection-order'
import { createCollectionOrder } from './create-collection-order'
import { deleteCollectionOrder } from './delete-collection-order'

export const Query = {
  ...collectionOrdersResolver,
  ...collectionOrderResolver
}

export const Mutation = {
  ...updateCollectionOrder,
  ...createCollectionOrder,
  ...deleteCollectionOrder
}
