import { gql } from 'apollo-server-koa'

export const ReleaseGood = gql`
  type ReleaseGood {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    from: String
    to: String
    deliveryOrder: DeliveryOrder
    shippingOption: Boolean
    shippingOrder: ShippingOrder
    orderInventories: [OrderInventory]
    orderVass: [OrderVas]
    status: String
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
