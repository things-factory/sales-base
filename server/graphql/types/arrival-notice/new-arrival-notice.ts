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
    truckNo: String
    refNo: String
    remark: String
    status: String
    orderProducts: [NewOrderProduct]
    orderVass: [NewOrderVas]
    deliveryOrderNo: String
  }
`
