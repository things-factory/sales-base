import gql from 'graphql-tag'

export const NewOrderInventory = gql`
  input NewOrderInventory {
    name: String
    description: String
    type: String
    arrivalNotice: ObjectRef
    deliveryOrder: ObjectRef
    returnOrder: ObjectRef
    inventory: ObjectRef
    product: ObjectRef
    batchId: String
    packingType: String
    releaseQty: Float
    releaseWeight: Float
    releaseUomValue: Float
    returnQty: Float
    returnWeight: Float
    returnUomValue: Float
    actualPackQty: Float
    actualPalletQty: Float
    remark: String
    issue: String
    crossDocking: Boolean
    status: String
    existingRow: Boolean
  }
`
