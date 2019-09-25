import { gql } from 'apollo-server-koa'

export const NewReleaseGood = gql`
  input NewReleaseGood {
    name: String!
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
    deliveryOrder: ObjectRef
    shippingOption: Boolean
    shipName: String
    containerNo: String
    shippingOrder: String
    orderProducts: [NewOrderProduct]
    orderVass: [NewOrderVas]
    status: String
    description: String
  }
`
