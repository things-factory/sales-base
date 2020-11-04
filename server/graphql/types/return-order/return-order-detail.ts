import gql from 'graphql-tag'

export const ReturnOrderDetail = gql`
  type ReturnOrderDetail {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    eta: String
    etaDate: String
    etaDateTime: String
    ownTransport: Boolean
    crossDocking: Boolean
    truckNo: String
    remark: String
    refNo: String
    attachment: [Attachment]
    orderInventories: [OrderInventory]
    orderVass: [OrderVas]
    status: String
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
    inventoryInfos: [InventoryInfos]
  }
`
