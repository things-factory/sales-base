import { gql } from 'apollo-server-koa'

export const ArrivalNoticeList = gql`
  type ArrivalNoticeList {
    items: [ArrivalNotice]
    total: Int
  }
`
