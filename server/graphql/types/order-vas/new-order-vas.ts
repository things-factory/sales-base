import { gql } from 'apollo-server-koa'

export const NewOrderVas = gql`
  input NewOrderVas {
    name: String
    description: String
    arrivalNotice: ObjectRef
    vas: ObjectRef
    batchId: String
    status: String
    remark: String
  }
`
