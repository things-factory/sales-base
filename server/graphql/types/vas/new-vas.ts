import { gql } from 'apollo-server-koa'

export const NewVas = gql`
  input NewVas {
    name: String!
    description: String
    defaultPrice: Float!
    currency: String
  }
`
