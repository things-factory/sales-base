import { arrivalNoticeResolver } from './arrival-notice'
import { arrivalNoticesResolver } from './arrival-notices'

import { updateArrivalNotice } from './update-arrival-notice'
import { createArrivalNotice } from './create-arrival-notice'
import { deleteArrivalNotice } from './delete-arrival-notice'
import { generateArrivalNotice } from './generate-arrival-notice'

export const Query = {
  ...arrivalNoticesResolver,
  ...arrivalNoticeResolver
}

export const Mutation = {
  ...updateArrivalNotice,
  ...createArrivalNotice,
  ...deleteArrivalNotice,
  ...generateArrivalNotice
}
