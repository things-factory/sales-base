import gql from 'graphql-tag'

export const QuotationPromotionList = gql`
  type QuotationPromotionList {
    items: [QuotationPromotion]
    total: Int
  }
`
