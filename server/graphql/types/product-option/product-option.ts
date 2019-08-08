import { gql } from 'apollo-server-koa'

export const ProductOption = gql`
  type ProductOption {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
