import { gql } from 'apollo-server-koa'

export const ProductOptionPatch = gql`
  input ProductOptionPatch {
    name: String
    description: String
  }
`
