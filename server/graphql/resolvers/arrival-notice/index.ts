import { arrivalNoticeResolver } from './arrival-notice'
import { arrivalNoticeRequestsResolver } from './arrival-notice-requests'
import { arrivalNoticesResolver } from './arrival-notices'
import { confirmArrivalNotice } from './confirm-arrival-notice'
import { createArrivalNotice } from './create-arrival-notice'
import { deleteArrivalNotice } from './delete-arrival-notice'
import { editArrivalNotice } from './edit-arrival-notice'
import { generateArrivalNotice } from './generate-arrival-notice'
import { receiveArrivalNotice } from './receive-arrival-notice'
import { updateArrivalNotice } from './update-arrival-notice'
import { checkArrivedNotice } from './check-arrived-notice'
import { rejectArrivalNotice } from './reject-arrival-notice'
import { assignBufferLocation } from './assign-buffer-location'

export const Query = {
  ...arrivalNoticesResolver,
  ...arrivalNoticeResolver,
  ...arrivalNoticeRequestsResolver
}

export const Mutation = {
  ...updateArrivalNotice,
  ...createArrivalNotice,
  ...deleteArrivalNotice,
  ...generateArrivalNotice,
  ...editArrivalNotice,
  ...confirmArrivalNotice,
  ...receiveArrivalNotice,
  ...checkArrivedNotice,
  ...rejectArrivalNotice,
  ...assignBufferLocation
}
