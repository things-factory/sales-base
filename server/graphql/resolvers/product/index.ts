import { createProduct } from './create-product'
import { customerProductsResolver } from './customer-products'
import { productByIdResolver } from './product-by-id'
import { deleteProduct } from './delete-product'
import { ownerProductsResolver } from './owner-products'
import { productResolver } from './product'
import { productsResolver } from './products'
import { updateProduct } from './update-product'

export const Query = {
  ...productsResolver,
  ...productResolver,
  ...ownerProductsResolver,
  ...customerProductsResolver,
  ...productByIdResolver
}

export const Mutation = {
  ...updateProduct,
  ...createProduct,
  ...deleteProduct
}
