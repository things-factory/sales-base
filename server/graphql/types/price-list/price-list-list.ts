import gql from 'graphql-tag'

export const PriceListList = gql`
  type PriceListList {
    items: [PriceList]
    total: Int
  }
`
