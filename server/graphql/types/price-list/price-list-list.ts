import { gql } from 'apollo-server-koa'

export const PriceListList = gql`
  type PriceListList {
    items: [PriceList]
    total: Int
  }
`
