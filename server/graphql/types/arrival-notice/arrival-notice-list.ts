import gql from 'graphql-tag'

export const ArrivalNoticeList = gql`
  type ArrivalNoticeList {
    items: [ArrivalNotice]
    total: Int
  }
`
