import gql from 'graphql-tag'

export const OrderInventoryPatch = gql`
  input OrderInventoryPatch {
    id: String
    name: String
    description: String
    type: String
    productName: String
    arrivalNotice: ObjectRef
    deliveryOrder: ObjectRef
    returnOrder: ObjectRef
    inventory: ObjectRef
    inspectedQty: Int
    inspectedWeight: Float
    inspectedLocation: ObjectRef
    inspectedBatchNo: String
    product: ObjectRef
    batchId: String
    packingType: String
    releaseQty: Float
    releaseWeight: Float
    returnQty: Float
    returnWeight: Float
    actualPackQty: Float
    actualPalletQty: Float
    remark: String
    issue: String
    crossDocking: Boolean
    status: String
    pallet: String
  }
`
