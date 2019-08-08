import { gql } from 'apollo-server-koa'

export const ProductBatchList = gql`
  type ProductBatchList {
    items: [ProductBatch]
    total: Int
  }
`
