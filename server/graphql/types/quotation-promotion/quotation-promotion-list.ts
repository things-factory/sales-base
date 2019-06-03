import { gql } from 'apollo-server-koa'

export const QuotationPromotionList = gql`
  type QuotationPromotionList {
    items: [QuotationPromotion]
    total: Int
  }
`
