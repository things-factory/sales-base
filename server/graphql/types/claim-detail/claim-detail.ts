import gql from 'graphql-tag'

export const ClaimDetail = gql`
  type ClaimDetail {
    id: String
    name: String
    domain: Domain
    description: String
    refNo: String
    amount: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
