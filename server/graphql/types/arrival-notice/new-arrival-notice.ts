import { gql } from 'apollo-server-koa'

export const NewArrivalNotice = gql`
  input NewArrivalNotice {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean!
    eta: String
    etaDate: String
    from: String
    to: String
    truckNo: String
    remark: String
    status: String
    orderProducts: [NewOrderProduct]
    orderVass: [NewOrderVas]
    collectionOrder: ObjectRef
    deliveryOrderNo: String
  }
`
