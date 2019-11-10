import gql from 'graphql-tag'

export const OrderVasPatch = gql`
  input OrderVasPatch {
    id: String
    name: String
    batchId: String
    arrivalNotice: ObjectRef
    releaseGood: ObjectRef
    shippingOrder: ObjectRef
    inventory: ObjectRef
    vas: ObjectRef
    operationGuide: String
    remark: String
    description: String
    status: String
    cuFlag: String
  }
`
