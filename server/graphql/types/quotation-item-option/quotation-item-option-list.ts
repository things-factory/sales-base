import gql from 'graphql-tag'

export const QuotationItemOptionList = gql`
  type QuotationItemOptionList {
    items: [QuotationItemOption]
    total: Int
  }
`
