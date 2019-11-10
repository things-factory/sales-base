import gql from 'graphql-tag'

export const NewQuotationItem = gql`
  input NewQuotationItem {
    qty: Int
    unit: String
    price: Float
    amount: Float
    product: String
    quotation: String
    options: [String]
  }
`
