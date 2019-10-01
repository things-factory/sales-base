import { gql } from 'apollo-server-koa'

export const NewCollectionOrder = gql`
  input NewCollectionOrder {
    name: String
    description: String
    from: String!
    to: String!
    truckNo: String
    orderProducts: [NewOrderProduct]
    orderVass: [NewOrderVas]
    telNo: String
    collectionDateTime: String
    collectionDate: String: String!
    loadType: String
    status: String!
  }
`
