import gql from 'graphql-tag'

export const PriceList = gql`
  type PriceList {
    id: String
    domain: Domain
    name: String
    revisionPriceOn: String
    product: Product
    optionName: String
    optionValue: String
    price: Float
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
