import { gql } from 'apollo-server-koa'

export const PriceList = gql`
  type PriceList {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
