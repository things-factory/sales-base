import { gql } from 'apollo-server-koa'

export const ReleaseGoodList = gql`
  type ReleaseGoodList {
    items: [ReleaseGood]
    total: Int
  }
`
