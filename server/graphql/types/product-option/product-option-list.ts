import { gql } from 'apollo-server-koa'

export const ProductOptionList = gql`
  type ProductOptionList {
    items: [ProductOption]
    total: Int
  }
`
