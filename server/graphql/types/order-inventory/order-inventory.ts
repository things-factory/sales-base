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
    productId: String
    productName: String
    product: Product
    batchId: String
    packingType: String
    originQty: Int
    inspectedQty: Int
    originWeight: Float
    originUomValue: Float
    inspectedWeight: Float
    inspectedUomValue: Float
    originLocation: Location
    inspectedLocation: Location
    remark: String
    palletQty: Int
    systemRemark: String
    originBatchNo: String
    inspectedBatchNo: String
    arrivalNotice: ArrivalNotice
    releaseGood: ReleaseGood
    releaseGoodName: String
    deliveryOrder: DeliveryOrder
    returnOrder: ReturnOrder
    releaseQty: Float
    releaseWeight: Float
    releaseUomValue: Float
    returnQty: Float
    returnWeight: Float
    returnUomValue: Float
    actualPackQty: Float
    actualPalletQty: Float
    crossDocking: Boolean
    status: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
