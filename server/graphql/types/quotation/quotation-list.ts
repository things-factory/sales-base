import gql from 'graphql-tag'

export const QuotationList = gql`
  type QuotationList {
    items: [Quotation]
    total: Int
  }
`
