import { gql } from 'apollo-server-koa'

export const GoodsReceivalNote = gql`
  type GoodsReceivalNote {
    id: String
    name: String
    domain: Domain
    description: String
    refNo: String
    arrivalNotice: ArrivalNotice
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
