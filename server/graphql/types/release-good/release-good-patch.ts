import gql from 'graphql-tag'

export const ReleaseGoodPatch = gql`
  input ReleaseGoodPatch {
    name: String
    releaseDate: String
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    exportOption: Boolean
    shippingOrder: ObjectRef
    deliveryOrders: [ObjectRef]
    orderInventories: [ObjectRef]
    orderVass: [ObjectRef]
    status: String
    remark: String
    description: String
  }
`
