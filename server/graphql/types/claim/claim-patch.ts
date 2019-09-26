import { gql } from 'apollo-server-koa'

export const ClaimPatch = gql`
  input ClaimPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
