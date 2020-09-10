import gql from 'graphql-tag'

export const ArrivalNotice = gql`
  type ArrivalNotice {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    description: String
    containerNo: String
    containerSize: String
    container: Boolean
    ownTransport: Boolean
    crossDocking: Boolean
    releaseGood: ReleaseGood
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
    jobSheet: JobSheet
    orderProducts: [OrderProduct]
    orderVass: [OrderVas]
    collectionOrders: [CollectionOrder]
    attachment: [Attachment]
    deliveryOrderNo: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
