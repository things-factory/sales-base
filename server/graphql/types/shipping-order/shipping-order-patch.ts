import { gql } from 'apollo-server-koa'

export const ShippingOrderPatch = gql`
  input ShippingOrderPatch {
    name: String
    description: String
  }
`
