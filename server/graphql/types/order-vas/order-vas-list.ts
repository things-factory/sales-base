import { gql } from 'apollo-server-koa'

export const OrderVasList = gql`
  type OrderVasList {
    items: [OrderVas]
    total: Int
  }
`
