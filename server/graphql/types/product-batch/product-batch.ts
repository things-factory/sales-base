import { gql } from 'apollo-server-koa'

export const ProductBatch = gql`
  type ProductBatch {
    id: String
    domain: Domain
    name: String
    yourName: String
    collectionOrders: [CollectionOrder]
    deliveryOrders: [DeliveryOrder]
    shippingOrders: [ShippingOrder]
    expiredOn: String
    palletQty: Float
    unit: String
    weight: String
    packageType: String
    qty: Float
    status: String
    product: Product
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
