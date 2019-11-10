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
    seq: Int
    batchId: String
    packingType: String
    unit: String
    weight: Int
    packQty: Int
    actualPackQty: Int
    palletQty: Int
    actualPalletQty: Int
    totalWeight: String
    remark: String
    issue: String
    status: String
  }
`
