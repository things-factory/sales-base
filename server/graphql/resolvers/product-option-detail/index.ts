import { productOptionDetailResolver } from './product-option-detail'
import { productOptionDetailsResolver } from './product-option-details'

import { updateProductOptionDetail } from './update-product-option-detail'
import { createProductOptionDetail } from './create-product-option-detail'
import { deleteProductOptionDetail } from './delete-product-option-detail'

export const Query = {
  ...productOptionDetailsResolver,
  ...productOptionDetailResolver
}

export const Mutation = {
  ...updateProductOptionDetail,
  ...createProductOptionDetail,
  ...deleteProductOptionDetail
}
