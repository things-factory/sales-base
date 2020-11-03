import gql from 'graphql-tag'

export const OrderInventory = gql`
  type OrderInventory {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    description: String
    inventory: Inventory
    productIdRef: String
    productName: String
    product: Product
    batchId: String
    packingType: String
    originQty: Int
    inspectedQty: Int
    originWeight: Float
    inspectedWeight: Float
    originLocation: Location
    inspectedLocation: Location
    remark: String
    palletQty: Int
    systemRemark: String
    originBatchNo: String
    inspectedBatchNo: String
    arrivalNotice: ArrivalNotice
    releaseGood: ReleaseGood
    deliveryOrder: DeliveryOrder
    releaseQty: Float
    releaseWeight: Float
    crossDocking: Boolean
    status: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
