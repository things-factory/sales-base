import gql from 'graphql-tag'

export const NewQuotationItemOption = gql`
  input NewQuotationItemOption {
    name: String!
    value: String
    quotationItem: String
    description: String
  }
`
