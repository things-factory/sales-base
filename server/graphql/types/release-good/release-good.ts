import { gql } from 'apollo-server-koa'

export const ReleaseGood = gql`
  type ReleaseGood {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    releaseDate: String
    to: String
    remark: String
    ownTransport: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    deliveryDateTime: String
    loadType: String
    deliveryOrderNo: String
    deliveryOrder: DeliveryOrder
    shippingOption: Boolean
    shipName: String
    containerNo: String
    shippingOrder: String
    orderVass: [OrderVas]
    orderProducts: [OrderProduct]
    status: String
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
