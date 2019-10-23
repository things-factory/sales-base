import { gql } from 'apollo-server-koa'

export const NewOrderVas = gql`
  input NewOrderVas {
    name: String
    batchId: String
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
