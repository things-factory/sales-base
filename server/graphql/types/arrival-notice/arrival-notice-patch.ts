import { gql } from 'apollo-server-koa'

export const ArrivalNoticePatch = gql`
  input ArrivalNoticePatch {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean
    importCargo: Boolean
    eta: String
    etaDate: String
    truckNo: String
    refNo: String
    remark: String
    status: String
    orderProducts: [ObjectRef]
    orderVass: [ObjectRef]
    collectionOrders: [ObjectRef]
    deliveryOrderNo: String
  }
`
