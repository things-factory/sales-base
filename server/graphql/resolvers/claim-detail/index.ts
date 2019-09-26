import { claimDetailResolver } from './claim-detail'
import { claimDetailsResolver } from './claim-details'

import { updateClaimDetail } from './update-claim-detail'
import { updateMultipleClaimDetail } from './update-multiple-claim-detail'
import { createClaimDetail } from './create-claim-detail'
import { deleteClaimDetail } from './delete-claim-detail'
import { deleteClaimDetails } from './delete-claim-details'

export const Query = {
  ...claimDetailsResolver,
  ...claimDetailResolver
}

export const Mutation = {
  ...updateClaimDetail,
  ...updateMultipleClaimDetail,
  ...createClaimDetail,
  ...deleteClaimDetail,
  ...deleteClaimDetails
}
