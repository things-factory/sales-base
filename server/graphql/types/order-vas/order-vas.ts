import { gql } from 'apollo-server-koa'

export const OrderVas = gql`
  type OrderVas {
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
