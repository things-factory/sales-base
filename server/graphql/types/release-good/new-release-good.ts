import { gql } from 'apollo-server-koa'

export const NewReleaseGood = gql`
  input NewReleaseGood {
    name: String!
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    deliveryOrder: ObjectRef
    shippingOption: Boolean
    shippingOrder: ObjectRef
    orderInventories: [NewOrderInventory]
    orderVass: [NewOrderVas]
    status: String
    description: String
  }
`
