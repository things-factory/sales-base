import { arrivalNoticeVasResolver } from './arrival-notice-vas'
import { arrivalNoticeVassResolver } from './arrival-notice-vass'

import { updateArrivalNoticeVas } from './update-arrival-notice-vas'
import { updateMultipleArrivalNoticeVas } from './update-multiple-arrival-notice-vas'
import { createArrivalNoticeVas } from './create-arrival-notice-vas'
import { deleteArrivalNoticeVas } from './delete-arrival-notice-vas'
import { deleteArrivalNoticeVass } from './delete-arrival-notice-vass'

export const Query = {
  ...arrivalNoticeVasResolver,
  ...arrivalNoticeVassResolver
}

export const Mutation = {
  ...updateArrivalNoticeVas,
  ...updateMultipleArrivalNoticeVas,
  ...createArrivalNoticeVas,
  ...deleteArrivalNoticeVas,
  ...deleteArrivalNoticeVass
}
