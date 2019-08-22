import { gql } from 'apollo-server-koa'

export const Product = gql`
  type Product {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    yourName: String
    description: String
    refTo: Product
    collectionOrders: [CollectionOrder]
    deliveryOrders: [DeliveryOrder]
    shippingOrders: [ShippingOrder]
    aliases: [Product]
    options: [ProductOption]
    batches: [ProductBatch]
    type: String
    packageType: String
    weight: String
    unit: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
