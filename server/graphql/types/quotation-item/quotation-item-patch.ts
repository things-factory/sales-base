import { gql } from 'apollo-server-koa'

export const QuotationItemPatch = gql`
  input QuotationItemPatch {
    qty: Int
    unit: String
    price: Float
    amount: Float
    product: Product
    quotation: Quotation
    options: [QuotationItemOption]
  }
`
