import gql from 'graphql-tag'

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
    batchId: String
    adjustedBatchId: String
    adjustedPalletQty: Int
    packingType: String
    unit: String
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
    createdAt: String
    updatedAt: String
    creator: User
    updater: User
  }
`
