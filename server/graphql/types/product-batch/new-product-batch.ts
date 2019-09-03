import { gql } from 'apollo-server-koa'

export const NewProductBatch = gql`
  input NewProductBatch {
    name: String!
    yourName: String!
    collectionOrders: [ObjectRef]
    deliveryOrders: [ObjectRef]
    shippingOrders: [ObjectRef]
    refTo: ObjectRef
    aliases: [ObjectRef]
    expiredOn: String
    qty: Float!
    palletQty: Float!
    unit: String
    weight: String
    packageType: String
    product: ObjectRef
    status: String!
    description: String
  }
`
