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
    loadWeight: Float
    urgency: Boolean
    cargoType: String
    otherCargoType: String
    collectionDateTime: String
    collectionDate: String!
    status: String
  }
`
