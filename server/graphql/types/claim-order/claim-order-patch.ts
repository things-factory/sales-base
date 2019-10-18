import { gql } from 'apollo-server-koa'

export const ClaimOrderPatch = gql`
  input ClaimOrderPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
