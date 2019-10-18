import { gql } from 'apollo-server-koa'

export const OrderInventoryPatch = gql`
  input OrderInventoryPatch {
    id: String
    name: String
    description: String
    type: String
    arrivalNotice: ObjectRef
    deliveryOrder: ObjectRef
    inventory: ObjectRef
    seq: Int
    releaseQty: Int
    remark: String
    issue: String
    status: String
  }
`
