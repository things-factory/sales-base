import { gql } from 'apollo-server-koa'

export const NewDeliveryOrder = gql`
  input NewDeliveryOrder {
    name: String!
    from: String!
    to: String!
    truckNo: String
    refNo: String
    orderProducts: [ObjectRef]!
    orderVass: [ObjectRef]
    deliveryDateTime: String!
    telNo: String
    loadType: String
    status: String!
    description: String
  }
`
