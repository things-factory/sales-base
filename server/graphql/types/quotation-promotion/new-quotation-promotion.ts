import gql from 'graphql-tag'

export const NewQuotationPromotion = gql`
  input NewQuotationPromotion {
    name: String!
    startAt: String!
    endAt: String!
    description: String
  }
`
