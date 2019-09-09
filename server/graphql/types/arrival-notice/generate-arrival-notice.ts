import { gql } from 'apollo-server-koa'

export const GenerateArrivalNotice = gql`
  input GenerateArrivalNotice {
    arrivalNotice: NewArrivalNotice!
    products: [NewOrderProduct]!
    vass: [NewOrderVas]!
  }
`
