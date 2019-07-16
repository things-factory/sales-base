import { gql } from 'apollo-server-koa'

export const PriceListPatch = gql`
  input PriceListPatch {
    name: String
    revisionPriceOn: String
    product: String
    optionName: String
    optionValue: String
    price: Float
    description: String
  }
`
