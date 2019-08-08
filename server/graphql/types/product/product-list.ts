import { gql } from 'apollo-server-koa'

export const ProductList = gql`
  type ProductList {
    items: [Product]
    total: Int
  }
`
