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
    loadWeight: Int
    looseItem: Boolean
    urgency: Boolean
    cargoType: String
    collectionDateTime: String
    collectionDate: String!
    status: String
  }
`
