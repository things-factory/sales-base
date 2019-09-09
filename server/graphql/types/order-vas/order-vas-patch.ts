import { gql } from 'apollo-server-koa'

export const OrderVasPatch = gql`
  input OrderVasPatch {
    id: String
    name: String
    description: String
    batchId: String
    arrivalNotice: ObjectRef
    vas: ObjectRef
    remark: String
    cuFlag: String
  }
`
