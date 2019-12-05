import { gql } from 'apollo-server-koa'

export const GoodsReceivalNote = gql`
  type GoodsReceivalNote {
    id: String
    name: String
    domain: Domain
    description: String
    refNo: String
    bizplace: Bizplace
    arrivalNotice: ArrivalNotice
    attachments: [Attachment]
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
