import { productOptionResolver } from './product-option'
import { productOptionsResolver } from './product-options'

import { updateProductOption } from './update-product-option'
import { createProductOption } from './create-product-option'
import { deleteProductOption } from './delete-product-option'

export const Query = {
  ...productOptionsResolver,
  ...productOptionResolver
}

export const Mutation = {
  ...updateProductOption,
  ...createProductOption,
  ...deleteProductOption
}
