import { gql } from 'apollo-server-koa'

export const ProductOptionDetailList = gql`
  type ProductOptionDetailList {
    items: [ProductOptionDetail]
    total: Int
  }
`
