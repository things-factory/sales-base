import { gql } from 'apollo-server-koa'

export const ProductBatchPatch = gql`
  input ProductBatchPatch {
    name: String
    description: String
  }
`
