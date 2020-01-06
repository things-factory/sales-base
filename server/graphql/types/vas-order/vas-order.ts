import gql from 'graphql-tag'

export const VasOrder = gql`
  type VasOrder {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    description: String
    orderVass: [OrderVas]
    status: String
    remark: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
