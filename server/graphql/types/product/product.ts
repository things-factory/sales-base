import { gql } from 'apollo-server-koa'

export const Product = gql`
  type Product {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    description: String
    productOptions: [ProductOption]
    batches: [ProductBatch]
    type: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
