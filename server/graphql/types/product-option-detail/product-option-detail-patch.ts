import { gql } from 'apollo-server-koa'

export const ProductOptionDetailPatch = gql`
  input ProductOptionDetailPatch {
    name: String
    productOption: String
    description: String
  }
`
