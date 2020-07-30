import { addArrivalNoticeProductsResolver } from './add-arrival-notice-products'
import { arrivalNoticeResolver } from './arrival-notice'
import { arrivalNoticeRequestsResolver } from './arrival-notice-requests'
import { arrivalNoticesResolver } from './arrival-notices'
import { bizplaceArrivalNoticesResolver } from './bizplace-arrival-notices'
import { checkArrivedNotice } from './check-arrived-notice'
import { confirmArrivalNoticeResolver } from './confirm-arrival-notice'
import { createArrivalNotice } from './create-arrival-notice'
import { deleteArrivalNoticeResolver } from './delete-arrival-notice'
import { generateArrivalNotice } from './generate-arrival-notice'
import { receiveArrivalNotice } from './receive-arrival-notice'
import { rejectArrivalNoticeResolver } from './reject-arrival-notice'
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
  ...confirmArrivalNoticeResolver,
  ...createArrivalNotice,
  ...deleteArrivalNoticeResolver,
  ...generateArrivalNotice,
  ...receiveArrivalNotice,
  ...rejectArrivalNoticeResolver,
  ...updateArrivalNotice
}
