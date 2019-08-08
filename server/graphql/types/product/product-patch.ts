import { gql } from 'apollo-server-koa'

export const ProductPatch = gql`
  input ProductPatch {
    name: String
    description: String
  }
`
