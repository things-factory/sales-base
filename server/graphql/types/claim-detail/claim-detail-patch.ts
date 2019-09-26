import { gql } from 'apollo-server-koa'

export const ClaimDetailPatch = gql`
  input ClaimDetailPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
