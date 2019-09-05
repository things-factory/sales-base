import { gql } from 'apollo-server-koa'

export const NewArrivalNotice = gql`
  input NewArrivalNotice {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean!
    eta: String
    pickingDateTime: String
    truckNo: String
    status: String!
    arrivalNoticeProducts: [NewArrivalNoticeProduct]
    arrivalNoticeVass: [NewArrivalNoticeVas]
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
  }
`
