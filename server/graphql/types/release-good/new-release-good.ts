import { gql } from 'apollo-server-koa'

export const NewReleaseGood = gql`
  input NewReleaseGood {
    name: String
    releaseDate: String
    releaseDateTime: Date
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    inventoryId: String
    productId: String
    deliveryOrder: ObjectRef
    exportOption: Boolean!
    shippingOrder: ObjectRef
    orderInventories: [NewOrderInventory]
    orderVass: [NewOrderVas]
    status: String
    description: String
  }
`
