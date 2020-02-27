import gql from 'graphql-tag'

export const NewOrderVas = gql`
  input NewOrderVas {
    name: String
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
