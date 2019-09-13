import { gql } from 'apollo-server-koa'

export const GenerateDeliveryOrder = gql`
  input GenerateDeliveryOrder {
    deliveryOrder: NewDeliveryOrder!
    products: [NewOrderProduct]!
    vass: [NewOrderVas]!
  }
`
