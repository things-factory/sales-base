import gql from 'graphql-tag'

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
    loadUomValue: Float
    urgency: Boolean
    cargoType: String
    looseItem: Boolean
    arrivalNotice: ObjectRef
    collectionDateTime: String
    collectionDate: String!
    status: String
  }
`
