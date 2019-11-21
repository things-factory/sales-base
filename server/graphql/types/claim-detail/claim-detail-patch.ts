import gql from 'graphql-tag'

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
