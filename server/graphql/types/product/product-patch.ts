import { gql } from 'apollo-server-koa'

export const ProductPatch = gql`
  input ProductPatch {
    bizplace: ObjectRef
    name: String
    yourName: String
    description: String
    refTo: ObjectRef
    collectionOrders: [ObjectRef]
    deliveryOrders: [ObjectRef]
    shippingOrders: [ObjectRef]
    aliases: [ObjectRef]
    options: [ObjectRef]
    batches: [ObjectRef]
    type: String
    packageType: String
    weight: String
    unit: String
  }
`
