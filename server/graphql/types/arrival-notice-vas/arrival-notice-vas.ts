import { gql } from 'apollo-server-koa'

export const ArrivalNoticeVas = gql`
  type ArrivalNoticeVas {
    id: String
    name: String
    domain: Domain
    description: String
    batchId: String
    arrivalNotice: ArrivalNotice
    vas: Vas
    remark: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
