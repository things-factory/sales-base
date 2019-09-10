import { gql } from 'apollo-server-koa'

export const NewCollectionOrder = gql`
  input NewCollectionOrder {
    name: String!
    description: String
    from: String!
    to: String!
    truckNo: String
    orderProducts: [ObjectRef]!
    orderVass: [ObjectRef]
    telNo: String
    collectionDateTime: String!
    loadType: String
    status: String!
  }
`
