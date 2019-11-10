import gql from 'graphql-tag'

export const QuotationItemPatch = gql`
  input QuotationItemPatch {
    qty: Int
    unit: String
    price: Float
    amount: Float
    product: String
    quotation: String
    options: [String]
  }
`
