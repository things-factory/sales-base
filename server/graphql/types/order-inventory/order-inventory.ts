import gql from 'graphql-tag'

export const OrderInventory = gql`
  type OrderInventory {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    description: String
    inventory: Inventory
    productName: String
    batchId: String
    packingType: String
    arrivalNotice: ArrivalNotice
    releaseGood: ReleaseGood
    shippingOrder: ShippingOrder
    deliveryOrder: DeliveryOrder
    seq: Int
    releaseQty: Int
    releaseWeight: Float
    status: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
