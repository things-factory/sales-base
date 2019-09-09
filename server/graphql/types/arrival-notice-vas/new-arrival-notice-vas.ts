import { gql } from 'apollo-server-koa'

export const NewArrivalNoticeVas = gql`
  input NewArrivalNoticeVas {
    name: String
    description: String
    arrivalNotice: ObjectRef
    vas: ObjectRef
    batchId: String
    status: String
    remark: String
  }
`
