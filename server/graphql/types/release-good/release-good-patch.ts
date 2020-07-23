import gql from 'graphql-tag'

export const ReleaseGoodPatch = gql`
  input ReleaseGoodPatch {
    name: String
    releaseDate: String
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    crossDocking: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    refNo: String
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
