import { gql } from 'apollo-server-koa'

export const NewArrivalNotice = gql`
  input NewArrivalNotice {
    name: String!
    description: String
    containerNo: String
    ownTransport: Boolean!
    eta: String
    truckNo: String
    status: String!
    arrivalNoticeProducts: [ObjectRef]!
    arrivalNoticeVass: [ObjectRef]
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
  }
`
