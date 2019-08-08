import { gql } from 'apollo-server-koa'

export const Product = gql`
  type Product {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
