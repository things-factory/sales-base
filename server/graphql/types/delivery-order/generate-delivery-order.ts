import { gql } from 'apollo-server-koa'

export const GenerateDeliveryOrder = gql`
  input GenerateDeliveryOrder {
    deliveryOrder: NewDeliveryOrder!
  }
`
