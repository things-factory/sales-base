import { gql } from 'apollo-server-koa'

export const NewOrderInventory = gql`
  input NewOrderInventory {
    name: String
    description: String
    type: String
    deliveryOrder: ObjectRef
    inventory: ObjectRef
    seq: Int
    releaseQty: String
    remark: String
    issue: String
    status: String
  }
`
