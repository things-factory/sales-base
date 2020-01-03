import { checkDeliveredOrder } from './check-delivered-order'
import { confirmDeliveryOrder } from './confirm-delivery-order'
import { createDeliveryOrder } from './create-delivery-order'
import { deleteDeliveryOrder } from './delete-delivery-order'
import { deliveryOrderResolver } from './delivery-order'
import { deliveryOrderByReleaseGoodResolver } from './delivery-order-by-release-good'
import { deliveryOrderRequestsResolver } from './delivery-order-requests'
import { deliveryOrdersResolver } from './delivery-orders'
import { dispatchDeliveryOrder } from './dispatch-delivery-order'
import { generateDeliveryOrder, generateDeliveryOrderResolver } from './generate-delivery-order'
import { receiveDeliveryOrder } from './receive-delivery-order'
import { rejectDeliveryOrder } from './reject-delivery-order'
import { updateDeliveryOrder } from './update-delivery-order'

export const Query = {
  ...deliveryOrdersResolver,
  ...deliveryOrderResolver,
  ...deliveryOrderRequestsResolver,
  ...deliveryOrderByReleaseGoodResolver
}

export const Mutation = {
  ...updateDeliveryOrder,
  ...createDeliveryOrder,
  ...generateDeliveryOrderResolver,
  ...deleteDeliveryOrder,
  ...generateDeliveryOrder,
  ...confirmDeliveryOrder,
  ...receiveDeliveryOrder,
  ...dispatchDeliveryOrder,
  ...checkDeliveredOrder,
  ...rejectDeliveryOrder
}
