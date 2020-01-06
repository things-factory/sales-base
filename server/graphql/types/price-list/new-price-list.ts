import gql from 'graphql-tag'

export const NewPriceList = gql`
  input NewPriceList {
    name: String!
    revisionPriceOn: String!
    product: String!
    optionName: String
    optionValue: String
    price: Float!
    description: String
  }
`
