import { claimResolver } from './claim'
import { claimsResolver } from './claims'
import { claimOrderListResolver } from './claim-order-list'
import { claimOrderDetailResolver } from './claim-order-detail'

import { updateClaim } from './update-claim'
import { updateMultipleClaim } from './update-multiple-claim'
import { createClaim } from './create-claim'
import { deleteClaim } from './delete-claim'
import { deleteClaims } from './delete-claims'

export const Query = {
  ...claimsResolver,
  ...claimResolver,
  ...claimOrderListResolver,
  ...claimOrderDetailResolver
}

export const Mutation = {
  ...updateClaim,
  ...updateMultipleClaim,
  ...createClaim,
  ...deleteClaim,
  ...deleteClaims
}
