import gql from 'graphql-tag'

export const ReleaseGoodDetail = gql`
  type ReleaseGoodDetail {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    releaseDate: String
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    remark: String
    refNo: String
    attachment: [Attachment]
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
    shippingOrderInfo: ShippingOrderInfo
    inventoryInfos: [InventoryInfos]
  }
`
