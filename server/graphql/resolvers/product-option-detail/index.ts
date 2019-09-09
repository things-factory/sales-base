import { createProductOptionDetail } from './create-product-option-detail'
import { deleteProductOptionDetail } from './delete-product-option-detail'
import { deleteProductOptionDetails } from './delete-product-option-details'
import { productOptionDetailResolver } from './product-option-detail'
import { productOptionDetailsResolver } from './product-option-details'
import { updateMultipleProductOptionDetail } from './update-multiple-product-option-detail'
import { updateProductOptionDetail } from './update-product-option-detail'

export const Query = {
  ...productOptionDetailsResolver,
  ...productOptionDetailResolver
}

export const Mutation = {
  ...updateProductOptionDetail,
  ...createProductOptionDetail,
  ...deleteProductOptionDetail,
  ...deleteProductOptionDetails,
  ...updateMultipleProductOptionDetail
}
