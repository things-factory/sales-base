import gql from 'graphql-tag'

export const NewArrivalNotice = gql`
  input NewArrivalNotice {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean!
    importCargo: Boolean
    jobSheetNo: String
    looseItem: Boolean
    ata: String
    eta: String
    etaDate: String
    truckNo: String
    refNo: String
    status: String
    remark: String
    orderProducts: [NewOrderProduct]
    orderVass: [NewOrderVas]
    deliveryOrderNo: String
    containerSize: String
  }
`
