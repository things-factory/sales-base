import { createOrderProduct } from './create-order-product'
import { deleteOrderProduct } from './delete-order-product'
import { deleteOrderProducts } from './delete-order-products'
import { orderProductResolver } from './order-product'
import { orderProductsResolver } from './order-products'
import { updateMultipleOrderProduct } from './update-multiple-order-product'
import { updateOrderProduct } from './update-order-product'

export const Query = {
  ...orderProductsResolver,
  ...orderProductResolver
}

export const Mutation = {
  ...updateOrderProduct,
  ...updateMultipleOrderProduct,
  ...createOrderProduct,
  ...deleteOrderProduct,
  ...deleteOrderProducts
}
