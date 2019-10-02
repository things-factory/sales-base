import { gql } from 'apollo-server-koa'

export const ReleaseGoodPatch = gql`
  input ReleaseGoodPatch {
    name: String
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    deliveryOrder: ObjectRef
    exportOption: Boolean
    shippingOrder: ObjectRef
    orderInventories: [ObjectRef]
    orderVass: [ObjectRef]
    status: String
    description: String
  }
`
