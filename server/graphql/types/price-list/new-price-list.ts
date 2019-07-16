import { gql } from 'apollo-server-koa'

export const NewPriceList = gql`
  type NewPriceList {
    name: String!
    revisionPriceOn: String!
    product: String!
    optionName: String
    optionValue: String
    price: Float!
    description: String
  }
`
