import { gql } from 'apollo-server-koa'

export const DeliveryOrderPatch = gql`
  input DeliveryOrderPatch {
    name: String
    type: String
    issuedOn: String
    state: String
    customer: String
    transportOrder: String
    description: String
  }
`
