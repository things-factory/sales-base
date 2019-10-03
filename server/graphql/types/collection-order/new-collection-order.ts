import { gql } from 'apollo-server-koa'

export const NewCollectionOrder = gql`
  input NewCollectionOrder {
    name: String
    description: String
    from: String
    to: String
    truckNo: String
    refNo: String
    telNo: String
    collectionDateTime: String
    collectionDate: String!
    loadType: String!
    status: String
  }
`
