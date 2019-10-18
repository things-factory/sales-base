import { claimOrderResolver } from './claim-order'
import { claimOrdersResolver } from './claim-orders'

import { updateClaimOrder } from './update-claim-order'
import { updateMultipleClaimOrder } from './update-multiple-claim-order'
import { createClaimOrder } from './create-claim-order'
import { deleteClaimOrder } from './delete-claim-order'
import { deleteClaimOrders } from './delete-claim-orders'

export const Query = {
  ...claimOrdersResolver,
  ...claimOrderResolver
}

export const Mutation = {
  ...updateClaimOrder,
  ...updateMultipleClaimOrder,
  ...createClaimOrder,
  ...deleteClaimOrder,
  ...deleteClaimOrders
}
