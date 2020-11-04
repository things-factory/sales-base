import gql from 'graphql-tag'

export const NewReturnOrder = gql`
  input NewReturnOrder {
    name: String
    description: String
    ownTransport: Boolean!
    eta: String
    etaDate: String
    truckNo: String
    deliveryOrderNo: String
    jobSheetNo: String
    refNo: String
    status: String
    remark: String
    orderInventories: [NewOrderInventory]
    orderVass: [NewOrderVas]
  }
`
