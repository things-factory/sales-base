import { gql } from 'apollo-server-koa'

export const NewArrivalNotice = gql`
  input NewArrivalNotice {
    bizplace: String!
    name: String!
    description: String
    containerNo: String
    transportFlag: Boolean
    eta: String
    truckNo: String
    status: String
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
  }
`
