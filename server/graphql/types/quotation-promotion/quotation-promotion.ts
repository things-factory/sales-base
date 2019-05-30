import { gql } from 'apollo-server-koa'

export const QuotationPromotion = gql`
  type QuotationPromotion {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
