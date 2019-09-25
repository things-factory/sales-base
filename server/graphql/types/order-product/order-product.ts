import { gql } from 'apollo-server-koa'

export const OrderProduct = gql`
  type OrderProduct {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    description: String
    type: String
    arrivalNotice: ArrivalNotice
    collectionOrder: CollectionOrder
    deliveryOrder: DeliveryOrder
    releaseGood: ReleaseGood
    shippingOrder: ShippingOrder
    fromInventory: Inventory
    currentInventory: Inventory
    toInventory: Inventory
    product: Product
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
    createdAt: String
    updatedAt: String
    creator: User
    updater: User
  }
`
