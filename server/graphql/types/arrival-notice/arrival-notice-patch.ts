import gql from 'graphql-tag'

export const ArrivalNoticePatch = gql`
  input ArrivalNoticePatch {
    name: String
    bizplace: ObjectRef
    description: String
    containerNo: String
    ownTransport: Boolean
    importCargo: Boolean
    eta: String
    ata: String
    containerSize: String
    looseItem: Boolean
    fromDate: String
    toDate: String
    mtDate: String
    etaDate: String
    truckNo: String
    refNo: String
    jobSheet: ObjectRef
    remark: String
    status: String
    orderProducts: [ObjectRef]
    orderVass: [ObjectRef]
    collectionOrders: [ObjectRef]
    deliveryOrderNo: String
  }
`
