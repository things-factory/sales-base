import { gql } from 'apollo-server-koa'

export const Product = gql`
  type Product {
    id: String
    domain: Domain
    company: Company
    name: String
    yourName: String
    refTo: Product
    aliases: [Product]
    options: [ProductOption]
    productBatch: ProductBatch
    type: String
    unit: String
    weight: Int
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
