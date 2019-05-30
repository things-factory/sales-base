import { gql } from 'apollo-server-koa'

export const QuotationPromotionPatch = gql`
  input QuotationPromotionPatch {
    name: String
    description: String
  }
`
