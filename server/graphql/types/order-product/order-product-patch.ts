import gql from 'graphql-tag'

export const OrderProductPatch = gql`
  input OrderProductPatch {
    id: String
    name: String
    description: String
    type: String
    arrivalNotice: ObjectRef
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
    releaseGood: ObjectRef
    shippingOrder: ObjectRef
    fromInventory: ObjectRef
    currentInventory: ObjectRef
    toInventory: ObjectRef
    product: ObjectRef
    batchId: String
    adjustedBatchId: String
    adjustedPalletQty: Int
    packingType: String
    uom: String
    uomValue: Float
    weight: Float
    packQty: Int
    actualPackQty: Int
    palletQty: Int
    actualPalletQty: Int
    totalWeight: String
    totalUomValue: String
    releaseQty: Int
    releaseWeight: Float
    releaseUomValue: Float
    remark: String
    issue: String
    status: String
    cuFlag: String
  }
`
