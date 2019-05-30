import { gql } from 'apollo-server-koa'

export const PriceListPatch = gql`
  input PriceListPatch {
    name: String
    description: String
  }
`
