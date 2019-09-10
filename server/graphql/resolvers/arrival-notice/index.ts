import { arrivalNoticeResolver } from './arrival-notice'
import { arrivalNoticesResolver } from './arrival-notices'
import { createArrivalNotice } from './create-arrival-notice'
import { deleteArrivalNotice } from './delete-arrival-notice'
import { editArrivalNotice } from './edit-arrival-notice'
import { generateArrivalNotice } from './generate-arrival-notice'
import { updateArrivalNotice } from './update-arrival-notice'
import { confirmArrivalNotice } from './confirm-arrival-notice'
import { requestedArrivalNoticesResolver } from './requested-arrival-notices'

export const Query = {
  ...arrivalNoticesResolver,
  ...arrivalNoticeResolver,
  ...requestedArrivalNoticesResolver
}

export const Mutation = {
  ...updateArrivalNotice,
  ...createArrivalNotice,
  ...deleteArrivalNotice,
  ...generateArrivalNotice,
  ...editArrivalNotice,
  ...confirmArrivalNotice
}
