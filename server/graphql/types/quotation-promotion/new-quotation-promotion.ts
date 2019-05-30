import { gql } from 'apollo-server-koa'

export const NewQuotationPromotion = gql`
  input NewQuotationPromotion {
    name: String!
    description: String
  }
`
