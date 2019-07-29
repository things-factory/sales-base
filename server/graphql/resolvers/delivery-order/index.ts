import { deliveryOrderResolver } from './delivery-order'
import { deliveryOrdersResolver } from './delivery-orders'

import { updateDeliveryOrder } from './update-delivery-order'
import { createDeliveryOrder } from './create-delivery-order'
import { deleteDeliveryOrder } from './delete-delivery-order'

export const Query = {
  ...deliveryOrdersResolver,
  ...deliveryOrderResolver
}

export const Mutation = {
  ...updateDeliveryOrder,
  ...createDeliveryOrder,
  ...deleteDeliveryOrder
}
