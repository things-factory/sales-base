import gql from 'graphql-tag'

export const NewArrivalNotice = gql`
  input NewArrivalNotice {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean!
    importCargo: Boolean
    eta: String
    etaDate: String
    adviseMtDate: String
    containerSize: String
    looseItem: Boolean
    truckNo: String
    refNo: String
    remark: String
    status: String
    orderProducts: [NewOrderProduct]
    orderVass: [NewOrderVas]
    deliveryOrderNo: String
  }
`
