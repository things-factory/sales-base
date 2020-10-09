import gql from 'graphql-tag'

export const GoodsReceivalNote = gql`
  type GoodsReceivalNote {
    id: String
    name: String
    domain: Domain
    description: String
    customerStatus: String
    status: String
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
