import gql from 'graphql-tag'

export const OrderInventoryPatch = gql`
  input OrderInventoryPatch {
    id: String
    name: String
    description: String
    type: String
    arrivalNotice: ObjectRef
    deliveryOrder: ObjectRef
    inventory: ObjectRef
    inspectedQty: Int
    inspectedWeight: Float
    inspectedLocation: ObjectRef
    product: ObjectRef
    batchId: String
    packingType: String
    releaseQty: Float
    releaseWeight: Float
    remark: String
    issue: String
    status: String
  }
`
