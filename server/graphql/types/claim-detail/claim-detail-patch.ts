import { gql } from 'apollo-server-koa'

export const ClaimDetailPatch = gql`
  input ClaimDetailPatch {
    id: String
    name: String
    refNo: String
    amount: Float
    description: String
    cuFlag: String
  }
`
