import { gql } from 'apollo-server-koa'

export const GenerateCollectionOrder = gql`
  input GenerateCollectionOrder {
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
