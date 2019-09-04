import { gql } from 'apollo-server-koa'

export const ArrivalNoticeVasList = gql`
  type ArrivalNoticeVasList {
    items: [ArrivalNoticeVas]
    total: Int
  }
`
