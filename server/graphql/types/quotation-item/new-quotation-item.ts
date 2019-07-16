import { gql } from 'apollo-server-koa'

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
