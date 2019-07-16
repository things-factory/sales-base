import { gql } from 'apollo-server-koa'

export const QuotationItem = gql`
  type QuotationItem {
    id: String
    domain: Domain
    qty: Int
    unit: String
    price: Float
    amount: Float
    product: Product
    quotation: Quotation
    options: [QuotationItemOption]
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
