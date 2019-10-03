import { gql } from 'apollo-server-koa'

export const NewOrderVas = gql`
  input NewOrderVas {
    name: String
    batchId: String
    arrivalNotice: ObjectRef
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
    releaseGood: ObjectRef
    shippingOrder: ObjectRef
    inventory: ObjectRef
    vas: ObjectRef
    remark: String
    description: String
    status: String
  }
`
