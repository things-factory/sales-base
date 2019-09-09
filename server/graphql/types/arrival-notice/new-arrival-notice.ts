import { gql } from 'apollo-server-koa'

export const NewArrivalNotice = gql`
  input NewArrivalNotice {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean!
    eta: String
    pickingDateTime: String
    from: String
    truckNo: String
    loadType: String
    status: String!
    orderProducts: [NewOrderProduct]
    orderVass: [NewOrderVas]
    collectionOrder: ObjectRef
    deliveryOrderNo: String
  }
`
