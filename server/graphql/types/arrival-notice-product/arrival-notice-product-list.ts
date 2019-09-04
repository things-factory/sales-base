import { gql } from 'apollo-server-koa'

export const ArrivalNoticeProductList = gql`
  type ArrivalNoticeProductList {
    items: [ArrivalNoticeProduct]
    total: Int
  }
`
