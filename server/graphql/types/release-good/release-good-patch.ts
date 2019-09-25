import { gql } from 'apollo-server-koa'

export const ReleaseGoodPatch = gql`
  input ReleaseGoodPatch {
    id: String
    name: String
    description: String
    containerNo: String
    to: String
    ownTransport: Boolean
    shippingOption: Boolean
    releaseDate: String
    deliveryDateTime: String
    inventoryId: String
    productId: String
    from: String
    truckNo: String
    loadType: String
    remark: String
    status: String
    orderProducts: [ObjectRef]
    orderVass: [ObjectRef]
    deliveryOrder: ObjectRef
    deliveryOrderNo: String
  }
`
