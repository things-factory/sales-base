import { createDeliveryOrder } from './create-delivery-order'
import { deleteDeliveryOrder } from './delete-delivery-order'
import { deliveryOrderResolver } from './delivery-order'
import { deliveryOrdersResolver } from './delivery-orders'
import { deliveryOrderRequestsResolver } from './delivery-order-requests'
import { updateDeliveryOrder } from './update-delivery-order'
import { generateDeliveryOrder } from './generate-delivery-order'
import { confirmDeliveryOrder } from './confirm-delivery-order'
import { editDeliveryOrder } from './edit-delivery-order'
import { receiveDeliveryOrder } from './receive-delivery-order'
import { dispatchDeliveryOrder } from './dispatch-delivery-order'
import { checkDeliveredOrder } from './check-delivered-order'

export const Query = {
  ...deliveryOrdersResolver,
  ...deliveryOrderResolver,
  ...deliveryOrderRequestsResolver
}

export const Mutation = {
  ...updateDeliveryOrder,
  ...createDeliveryOrder,
  ...deleteDeliveryOrder,
  ...generateDeliveryOrder,
  ...confirmDeliveryOrder,
  ...editDeliveryOrder,
  ...receiveDeliveryOrder,
  ...dispatchDeliveryOrder,
  ...checkDeliveredOrder
}
