import { createProductOption } from './create-product-option'
import { deleteProductOption } from './delete-product-option'
import { deleteProductOptions } from './delete-product-options'
import { productOptionResolver } from './product-option'
import { productOptionsResolver } from './product-options'
import { updateMultipleProductOption } from './update-multiple-product-option'
import { updateProductOption } from './update-product-option'

export const Query = {
  ...productOptionsResolver,
  ...productOptionResolver
}

export const Mutation = {
  ...updateProductOption,
  ...createProductOption,
  ...deleteProductOption,
  ...deleteProductOptions,
  ...updateMultipleProductOption
}
