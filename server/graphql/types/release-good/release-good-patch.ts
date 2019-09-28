import { gql } from 'apollo-server-koa'

export const ReleaseGoodPatch = gql`
  input ReleaseGoodPatch {
    id: String
    name: String!
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    from: String
    to: String
    loadType: String
    deliveryOrder: ObjectRef
    shippingOption: Boolean
    shippingOrder: ObjectRef
    orderInventories: [ObjectRef]
    orderVass: [ObjectRef]
    status: String
    description: String
  }
`
