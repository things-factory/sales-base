import { gql } from 'apollo-server-koa'

export const ReleaseGood = gql`
  type ReleaseGood {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    releaseDate: String
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    deliveryOrder: DeliveryOrder
    exportOption: Boolean
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
