import { vasOrderResolver } from './vas-order'
import { vasOrdersResolver } from './vas-orders'
import { vasOrderRequestsResolver } from './vas-order-requests'

import { updateVasOrder } from './update-vas-order'
import { createVasOrder } from './create-vas-order'
import { deleteVasOrder } from './delete-vas-order'
import { deleteVasOrders } from './delete-vas-orders'
import { generateVasOrder } from './generate-vas-order'
import { editVasOrder } from './edit-vas-order'
import { confirmVasOrder } from './confirm-vas-order'
import { executeVasOrder } from './execute-vas-order'
import { receiveVasOrder } from './receive-vas-order'
import { rejectVasOrder } from './reject-vas-order'

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
  ...editVasOrder,
  ...confirmVasOrder,
  ...executeVasOrder,
  ...receiveVasOrder,
  ...rejectVasOrder
}
