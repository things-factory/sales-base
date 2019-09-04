import { gql } from 'apollo-server-koa'

export const GenerateArrivalNotice = gql`
  type GenerateArrivalNotice {
    arrivalNotice: NewArrivalNotice!
    products: [NewArrivalNoticeProduct]!
    vass: [NewArrivalNoticeVas]!
  }
`
