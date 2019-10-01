import { gql } from 'apollo-server-koa'

export const NewVasOrder = gql`
  input NewVasOrder {
    name: String
    description: String
    orderVass: [NewOrderVas]
    status: String
  }
`
