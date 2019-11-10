import gql from 'graphql-tag'

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
    remark: String
    status: String
    orderProducts: [ObjectRef]
    orderVass: [ObjectRef]
    collectionOrders: [ObjectRef]
    deliveryOrderNo: String
  }
`
