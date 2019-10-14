import { gql } from 'apollo-server-koa'

export const RelabelResult = gql`
  type RelabelResult {
    product: Product
    inventory: Inventory
  }
`
