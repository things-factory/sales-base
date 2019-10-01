import { gql } from 'apollo-server-koa'

export const ArrivalNoticePatch = gql`
  input ArrivalNoticePatch {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean
    eta: String
    etaDate: String
    from: String
    to: String
    truckNo: String
    remark: String
    status: String
    orderProducts: [ObjectRef]
    orderVass: [ObjectRef]
    collectionOrder: ObjectRef
    deliveryOrderNo: String
  }
`
