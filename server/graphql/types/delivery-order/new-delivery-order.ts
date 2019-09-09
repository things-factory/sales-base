import { gql } from 'apollo-server-koa'

export const NewDeliveryOrder = gql`
  input NewDeliveryOrder {
    name: String!
    from: String!
    to: String!
    truckNo: String
    orderProducts: [ObjectRef]!
    orderVass: [ObjectRef]
    deliveryDateTime: Date!
    loadType: String
    status: String!
    description: String
  }
`
