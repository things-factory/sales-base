import gql from 'graphql-tag'

export const NewOrderProduct = gql`
  input NewOrderProduct {
    name: String
    description: String
    type: String
    arrivalNotice: ObjectRef
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
    fromInventory: ObjectRef
    currentInventory: ObjectRef
    toInventory: ObjectRef
    product: ObjectRef
    batchId: String
    adjustedBatchId: String
    packingType: String
    unit: String
    stdUnit: String
    stdUnitValue: Float
    weight: Float
    packQty: Int
    actualPackQty: Int
    palletQty: Int
    actualPalletQty: Int
    totalWeight: String
    totalStdUnitValue: String
    releaseQty: Int
    releaseWeight: Float
    releaseStdUnitValue: Float
    remark: String
    issue: String
    status: String
  }
`
