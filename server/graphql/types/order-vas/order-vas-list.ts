import gql from 'graphql-tag'

export const OrderVasList = gql`
  type OrderVasList {
    items: [OrderVas]
    total: Int
  }
`
