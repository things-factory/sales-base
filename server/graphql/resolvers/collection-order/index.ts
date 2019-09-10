import { collectionOrderResolver } from './collection-order'
import { collectionOrdersResolver } from './collection-orders'
import { createCollectionOrder } from './create-collection-order'
import { deleteCollectionOrder } from './delete-collection-order'
import { updateCollectionOrder } from './update-collection-order'
import { generateCollectionOrder } from './generate-collection-order'
import { editCollectionOrder } from './edit-collection-order'
import { confirmCollectionOrder } from './confirm-collection-order'

export const Query = {
  ...collectionOrdersResolver,
  ...collectionOrderResolver
}

export const Mutation = {
  ...updateCollectionOrder,
  ...createCollectionOrder,
  ...deleteCollectionOrder,
  ...generateCollectionOrder,
  ...editCollectionOrder,
  ...confirmCollectionOrder
}
