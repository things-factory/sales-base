import gql from 'graphql-tag'

export const ClaimOrderPatch = gql`
  input ClaimOrderPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
