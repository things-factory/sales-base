import gql from 'graphql-tag'

export const ReturnOrder = gql`
  type ReturnOrder {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    description: String
    ownTransport: Boolean
    eta: String
    etaDate: String
    truckNo: String
    deliveryOrder: String
    jobSheetNo: String
    refNo: String
    status: String
    remark: String
    jobSheet: JobSheet
    orderInventories: [OrderInventory]
    orderVass: [OrderVas]
    attachment: [Attachment]
    updater: User
    creator: User
    acceptedBy: User
    updatedAt: String
    createdAt: String
  }
`
