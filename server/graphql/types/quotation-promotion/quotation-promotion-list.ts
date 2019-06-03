import { gql } from 'apollo-server-koa'

export const QuotationPromotionList = gql`
  input QuotationPromotionList {
    items: [QuotationPromotion]
    total: Int
  }
`
