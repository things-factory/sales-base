import { gql } from 'apollo-server-koa'

export const NewPriceList = gql`
  type NewPriceList {
    name: String!
    description: String
  }
`
