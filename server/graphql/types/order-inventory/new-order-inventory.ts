import { gql } from 'apollo-server-koa'

export const NewOrderInventory = gql`
  input NewOrderInventory {
    name: String
    description: String
    type: String
    deliveryOrder: ObjectRef
    inventory: ObjectRef
    seq: Int
    releaseQty: Int
    remark: String
    issue: String
    status: String
  }
`
