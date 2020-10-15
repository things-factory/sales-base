import gql from 'graphql-tag'

export const NewOrderInventory = gql`
  input NewOrderInventory {
    name: String
    description: String
    type: String
    arrivalNotice: ObjectRef
    deliveryOrder: ObjectRef
    inventory: ObjectRef
    product: ObjectRef
    batchId: String
    packingType: String
    releaseQty: Float
    releaseWeight: Float
    remark: String
    issue: String
    crossDocking: Boolean
    status: String
    existingRow: Boolean
  }
`
