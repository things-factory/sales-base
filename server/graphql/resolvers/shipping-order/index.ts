import { createShippingOrder } from './create-shipping-order'
import { deleteShippingOrder } from './delete-shipping-order'
import { shippingOrderResolver } from './shipping-order'
import { shippingOrdersResolver } from './shipping-orders'
import { updateShippingOrder } from './update-shipping-order'

export const Query = {
  ...shippingOrdersResolver,
  ...shippingOrderResolver
}

export const Mutation = {
  ...updateShippingOrder,
  ...createShippingOrder,
  ...deleteShippingOrder
}
