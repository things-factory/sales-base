import { gql } from 'apollo-server-koa'

export const OrderInventory = gql`
  type OrderInventory {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    description: String
    inventory: Inventory
    releaseGood: ReleaseGood
    shippingOrder: ShippingOrder
    deliveryOrder: DeliveryOrder
    seq: Int
    releaseQty: Int
    status: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
