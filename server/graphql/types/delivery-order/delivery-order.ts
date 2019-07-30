import { gql } from 'apollo-server-koa'

export const DeliveryOrder = gql`
  type DeliveryOrder {
    id: String
    domain: Domain
    name: String
    type: String
    issuedOn: String
    customer: Customer
    transportOrder: TransportOrder
    state: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
