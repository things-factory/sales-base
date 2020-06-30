import { addArrivalNoticeProductsResolver } from './add-arrival-notice-products'
import { bizplaceArrivalNoticesResolver } from './bizplace-arrival-notices'
import { arrivalNoticeResolver } from './arrival-notice'
import { arrivalNoticeRequestsResolver } from './arrival-notice-requests'
import { arrivalNoticesResolver } from './arrival-notices'
import { checkArrivedNotice } from './check-arrived-notice'
import { confirmArrivalNotice } from './confirm-arrival-notice'
import { createArrivalNotice } from './create-arrival-notice'
import { deleteArrivalNotice } from './delete-arrival-notice'
import { generateArrivalNotice } from './generate-arrival-notice'
import { receiveArrivalNotice } from './receive-arrival-notice'
import { rejectArrivalNotice } from './reject-arrival-notice'
import { updateArrivalNotice } from './update-arrival-notice'

export const Query = {
  ...arrivalNoticeResolver,
  ...arrivalNoticeRequestsResolver,
  ...arrivalNoticesResolver,
  ...bizplaceArrivalNoticesResolver
}

export const Mutation = {
  ...addArrivalNoticeProductsResolver,
  ...checkArrivedNotice,
  ...confirmArrivalNotice,
  ...createArrivalNotice,
  ...deleteArrivalNotice,
  ...generateArrivalNotice,
  ...receiveArrivalNotice,
  ...rejectArrivalNotice,
  ...updateArrivalNotice
}
