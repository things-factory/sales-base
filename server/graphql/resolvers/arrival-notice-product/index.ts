import { arrivalNoticeProductResolver } from './arrival-notice-product'
import { arrivalNoticeProductsResolver } from './arrival-notice-products'

import { updateArrivalNoticeProduct } from './update-arrival-notice-product'
import { updateMultipleArrivalNoticeProduct } from './update-multiple-arrival-notice-product'
import { createArrivalNoticeProduct } from './create-arrival-notice-product'
import { deleteArrivalNoticeProduct } from './delete-arrival-notice-product'
import { deleteArrivalNoticeProducts } from './delete-arrival-notice-products'

export const Query = {
  ...arrivalNoticeProductsResolver,
  ...arrivalNoticeProductResolver
}

export const Mutation = {
  ...updateArrivalNoticeProduct,
  ...updateMultipleArrivalNoticeProduct,
  ...createArrivalNoticeProduct,
  ...deleteArrivalNoticeProduct,
  ...deleteArrivalNoticeProducts
}
