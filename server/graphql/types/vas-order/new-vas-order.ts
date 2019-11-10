import gql from 'graphql-tag'

export const NewVasOrder = gql`
  input NewVasOrder {
    name: String
    description: String
    orderVass: [NewOrderVas]
    status: String
  }
`
