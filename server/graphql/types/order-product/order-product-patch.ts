import { gql } from 'apollo-server-koa'

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
    cuFlag: String
  }
`
