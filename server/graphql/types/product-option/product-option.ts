import { gql } from 'apollo-server-koa'

export const ProductOption = gql`
  type ProductOption {
    id: String
    name: String
    domain: Domain
    product: Product
    productOptionDetails: [ProductOptionDetail]
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
