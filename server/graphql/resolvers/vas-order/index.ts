import { vasOrderResolver } from './vas-order'
import { vasOrdersResolver } from './vas-orders'
import { vasOrderRequestsResolver } from './vas-order-requests'

import { updateVasOrder } from './update-vas-order'
import { createVasOrder } from './create-vas-order'
import { deleteVasOrder } from './delete-vas-order'
import { deleteVasOrders } from './delete-vas-orders'
import { generateVasOrder } from './generate-vas-order'
import { confirmVasOrder } from './confirm-vas-order'
import { rejectVasOrder } from './reject-vas-order'
import { relabel } from './relabel'

export const Query = {
  ...vasOrdersResolver,
  ...vasOrderResolver,
  ...vasOrderRequestsResolver
}

export const Mutation = {
  ...updateVasOrder,
  ...createVasOrder,
  ...deleteVasOrder,
  ...deleteVasOrders,
  ...generateVasOrder,
  ...confirmVasOrder,
  ...rejectVasOrder,
  ...relabel
}
