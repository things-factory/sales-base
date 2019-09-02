import { gql } from 'apollo-server-koa'

export const NewVas = gql`
  input NewVas {
    bizplace: ObjectRef!
    name: String!
    description: String
    defaultPrice: Float!
  }
`
