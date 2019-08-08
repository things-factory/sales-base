import { productBatchResolver } from './product-batch'
import { productBatchesResolver } from './product-batches'

import { updateProductBatch } from './update-product-batch'
import { createProductBatch } from './create-product-batch'
import { deleteProductBatch } from './delete-product-batch'

export const Query = {
  ...productBatchesResolver,
  ...productBatchResolver
}

export const Mutation = {
  ...updateProductBatch,
  ...createProductBatch,
  ...deleteProductBatch
}
