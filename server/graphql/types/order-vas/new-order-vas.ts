import gql from 'graphql-tag'

export const NewOrderVas = gql`
  input NewOrderVas {
    name: String
    set: Int
    targetType: String
    targetBatchId: String
    targetProduct: ObjectRef
    otherTarget: String
    qty: Int
    weight: Float
    batchId: String
    productName: String
    packingType: String
    arrivalNotice: ObjectRef
    releaseGood: ObjectRef
    shippingOrder: ObjectRef
    inventory: ObjectRef
    vas: ObjectRef
    type: String
    operationGuide: String
    remark: String
    description: String
    status: String
  }
`
