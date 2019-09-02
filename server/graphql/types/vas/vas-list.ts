import { gql } from 'apollo-server-koa'

export const VasList = gql`
  type VasList {
    items: [Vas]
    total: Int
  }
`
