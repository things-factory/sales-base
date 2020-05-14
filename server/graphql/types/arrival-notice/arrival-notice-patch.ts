import gql from 'graphql-tag'

export const ArrivalNoticePatch = gql`
  input ArrivalNoticePatch {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean
    importCargo: Boolean
    eta: String
    ata: String
    containerSize: String
    looseItem: Boolean
    mtDate: String
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
