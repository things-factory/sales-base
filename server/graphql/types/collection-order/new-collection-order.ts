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
    loadWeight: Float
    urgency: Boolean
    cargoType: String
    arrivalNotice: ObjectRef
    collectionDateTime: String
    collectionDate: String!
    status: String
  }
`
