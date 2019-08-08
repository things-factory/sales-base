import { gql } from 'apollo-server-koa'

export const ShippingOrder = gql`
  type ShippingOrder {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
