import gql from 'graphql-tag'

export const NewOrderInventory = gql`
  input NewOrderInventory {
    name: String
    description: String
    type: String
    arrivalNotice: ObjectRef
    deliveryOrder: ObjectRef
    inventory: ObjectRef
    seq: Int
    releaseQty: Int
    releaseWeight: Float
    remark: String
    issue: String
    status: String
  }
`
