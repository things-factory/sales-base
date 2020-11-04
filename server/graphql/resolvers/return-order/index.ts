import { confirmReturnOrderResolver } from './confirm-return-order'
import { returnOrderResolver } from './return-order'
import { returnOrdersResolver } from './return-orders'
import { generateReturnOrder } from './generate-return-order'
import { returnOrderDetailResolver } from './return-order-detail'
import { returnOrderRequestsResolver } from './return-order-requests'

import { updateReturnOrder } from './update-return-order'
import { updateMultipleReturnOrder } from './update-multiple-return-order'
import { createReturnOrder } from './create-return-order'
import { deleteReturnOrderResolver } from './delete-return-order'
import { deleteReturnOrders } from './delete-return-orders'
import { receiveReturnOrderResolver } from './receive-return-order'
import { rejectReturnOrderResolver } from './reject-return-order'
import { checkReturnOrderResolver } from './check-return-order'

export const Query = {
  ...returnOrdersResolver,
  ...returnOrderResolver,
  ...returnOrderDetailResolver,
  ...returnOrderRequestsResolver
}

export const Mutation = {
  ...updateReturnOrder,
  ...updateMultipleReturnOrder,
  ...createReturnOrder,
  ...deleteReturnOrderResolver,
  ...deleteReturnOrders,
  ...confirmReturnOrderResolver,
  ...generateReturnOrder,
  ...receiveReturnOrderResolver,
  ...rejectReturnOrderResolver,
  ...checkReturnOrderResolver
}
