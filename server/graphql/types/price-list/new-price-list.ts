import { gql } from 'apollo-server-koa'

export const NewPriceList = gql`
  input NewPriceList {
    name: String!
    description: String
  }
`
