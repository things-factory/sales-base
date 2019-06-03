import { gql } from 'apollo-server-koa'

export const PriceListList = gql`
  input PriceListList {
    items: [PriceList]
    total: Int
  }
`
