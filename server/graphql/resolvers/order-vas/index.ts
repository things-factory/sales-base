import { createOrderVas } from './create-order-vas'
import { deleteOrderVas } from './delete-order-vas'
import { deleteOrderVass } from './delete-order-vass'
import { orderVasResolver } from './order-vas'
import { orderVassResolver } from './order-vass'
import { updateMultipleOrderVas } from './update-multiple-order-vas'
import { updateOrderVas } from './update-order-vas'

export const Query = {
  ...orderVasResolver,
  ...orderVassResolver
}

export const Mutation = {
  ...updateOrderVas,
  ...updateMultipleOrderVas,
  ...createOrderVas,
  ...deleteOrderVas,
  ...deleteOrderVass
}
