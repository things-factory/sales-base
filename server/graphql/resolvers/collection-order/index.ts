import { collectionOrderResolver } from './collection-order'
import { collectionOrdersResolver } from './collection-orders'
import { collectionOrderRequestsResolver } from './collection-order-requests'
import { createCollectionOrder } from './create-collection-order'
import { deleteCollectionOrder } from './delete-collection-order'
import { updateCollectionOrder } from './update-collection-order'
import { generateCollectionOrder } from './generate-collection-order'
import { editCollectionOrder } from './edit-collection-order'
import { confirmCollectionOrder } from './confirm-collection-order'
import { receiveCollectionOrder } from './receive-collection-order'
import { dispatchCollectionOrder } from './dispatch-collection-order'
import { checkCollectedOrder } from './check-collected-order'
import { rejectCollectionOrder } from './reject-collection-order'

export const Query = {
  ...collectionOrdersResolver,
  ...collectionOrderResolver,
  ...collectionOrderRequestsResolver
}

export const Mutation = {
  ...updateCollectionOrder,
  ...createCollectionOrder,
  ...deleteCollectionOrder,
  ...generateCollectionOrder,
  ...editCollectionOrder,
  ...confirmCollectionOrder,
  ...receiveCollectionOrder,
  ...dispatchCollectionOrder,
  ...checkCollectedOrder,
  ...rejectCollectionOrder
}
