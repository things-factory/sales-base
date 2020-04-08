import gql from 'graphql-tag'

export const OrderVas = gql`
  type OrderVas {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    set: Int
    targetType: String
    targetBatchId: String
    targetProduct: Product
    otherTarget: String
    qty: Int
    batchId: String
    productName: String
    packingType: String
    arrivalNotice: ArrivalNotice
    releaseGood: ReleaseGood
    shippingOrder: ShippingOrder
    inventory: Inventory
    vas: Vas
    operationGuide: String
    remark: String
    description: String
    status: String
    createdAt: String
    updatedAt: String
    creator: User
    updater: User
  }
`
