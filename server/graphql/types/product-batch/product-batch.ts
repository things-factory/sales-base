import { gql } from 'apollo-server-koa'

export const ProductBatch = gql`
  type ProductBatch {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
