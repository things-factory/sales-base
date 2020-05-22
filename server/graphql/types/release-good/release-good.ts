import gql from 'graphql-tag'

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
    refNo: String
    productId: String
    attachments: [Attachment]
    deliveryOrders: [DeliveryOrder]
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
