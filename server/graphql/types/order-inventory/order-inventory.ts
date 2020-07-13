import gql from 'graphql-tag'

export const OrderInventory = gql`
  type OrderInventory {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    description: String
    inventory: Inventory
    productIdRef: String
    productName: String
    batchId: String
    packingType: String
    inspectedQty: Int
    inspectedWeight: Float
    inspectedLocation: Location
    arrivalNotice: ArrivalNotice
    releaseGood: ReleaseGood
    deliveryOrder: DeliveryOrder
    releaseQty: Float
    releaseWeight: Float
    status: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
