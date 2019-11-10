import gql from 'graphql-tag'

export const ClaimPatch = gql`
  input ClaimPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
