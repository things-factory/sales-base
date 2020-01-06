import gql from 'graphql-tag'

export const QuotationItemOptionPatch = gql`
  input QuotationItemOptionPatch {
    name: String
    value: String
    quotationItem: String
    description: String
  }
`
