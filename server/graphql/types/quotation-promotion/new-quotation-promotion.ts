import { gql } from 'apollo-server-koa'

export const NewQuotationPromotion = gql`
  input NewQuotationPromotion {
    name: String!
    startAt: String!
    endAt: String!
    description: String
  }
`
