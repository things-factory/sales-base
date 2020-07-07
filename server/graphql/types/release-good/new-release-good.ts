import gql from 'graphql-tag'

export const NewReleaseGood = gql`
  input NewReleaseGood {
    name: String
    releaseDate: String
    releaseDateTime: String
    collectionOrderNo: String
    ownTransport: Boolean
    truckNo: String
    refNo: String
    exportOption: Boolean!
    shippingOrder: ObjectRef
    orderInventories: [NewOrderInventory]
    orderVass: [NewOrderVas]
    status: String
    description: String
  }
`
