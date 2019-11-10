import gql from 'graphql-tag'

export const QuotationPromotionPatch = gql`
  input QuotationPromotionPatch {
    name: String
    startAt: String
    endAt: String
    description: String
  }
`
