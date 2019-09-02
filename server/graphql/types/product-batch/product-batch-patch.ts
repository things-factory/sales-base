import { gql } from 'apollo-server-koa'

export const ProductBatchPatch = gql`
  input ProductBatchPatch {
    id: String
    name: String
    yourName: String
    collectionOrders: [ObjectRef]
    deliveryOrders: [ObjectRef]
    shippingOrders: [ObjectRef]
    palletQty: Float
    unit: String
    weight: String
    packageType: String
    qty: Float
    status: String
    product: ObjectRef
    description: String
    cuFlag: String
  }
`
