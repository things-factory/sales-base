import gql from 'graphql-tag'

export const QuotationItemList = gql`
  type QuotationItemList {
    items: [QuotationItem]
    total: Int
  }
`
