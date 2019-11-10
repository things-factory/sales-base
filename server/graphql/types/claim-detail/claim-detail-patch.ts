import gql from 'graphql-tag'

export const ClaimDetailPatch = gql`
  input ClaimDetailPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
