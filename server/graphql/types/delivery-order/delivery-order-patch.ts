import { gql } from 'apollo-server-koa'

export const DeliveryOrderPatch = gql`
  input DeliveryOrderPatch {
    name: String
    issuedOn: String
    customer: String
    state: String
    description: String
  }
`
