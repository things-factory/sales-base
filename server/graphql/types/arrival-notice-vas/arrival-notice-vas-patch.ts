import { gql } from 'apollo-server-koa'

export const ArrivalNoticeVasPatch = gql`
  input ArrivalNoticeVasPatch {
    id: String
    name: String
    description: String
    batchId: String
    arrivalNotice: ObjectRef
    vas: ObjectRef
    remark: String
    status: String
    cuFlag: String
  }
`
