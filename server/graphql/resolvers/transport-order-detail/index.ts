import { transportOrderDetailResolver } from './transport-order-detail'
import { transportOrderDetailsResolver } from './transport-order-details'

import { updateTransportOrderDetail } from './update-transport-order-detail'
import { createTransportOrderDetail } from './create-transport-order-detail'
import { deleteTransportOrderDetail } from './delete-transport-order-detail'
import { deleteTransportOrderDetails } from './delete-transport-order-details'

export const Query = {
  ...transportOrderDetailsResolver,
  ...transportOrderDetailResolver
}

export const Mutation = {
  ...updateTransportOrderDetail,
  ...createTransportOrderDetail,
  ...deleteTransportOrderDetail,
  ...deleteTransportOrderDetails
}
