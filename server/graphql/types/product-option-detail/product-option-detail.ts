import { gql } from 'apollo-server-koa'

export const ProductOptionDetail = gql`
  type ProductOptionDetail {
    id: String
    domain: Domain
    name: String
    productOption: ProductOption
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
