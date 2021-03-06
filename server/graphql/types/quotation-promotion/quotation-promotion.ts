import gql from 'graphql-tag'

export const QuotationPromotion = gql`
  type QuotationPromotion {
    id: String
    domain: Domain
    name: String
    startAt: String
    endAt: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
