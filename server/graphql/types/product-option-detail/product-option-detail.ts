import { gql } from 'apollo-server-koa'

export const ProductOptionDetail = gql`
  type ProductOptionDetail {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
