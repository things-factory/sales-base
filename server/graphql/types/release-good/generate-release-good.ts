import { gql } from 'apollo-server-koa'

export const GenerateReleaseGood = gql`
  input GenerateReleaseGood {
    releaseGood: NewReleaseGood!
    products: [NewOrderProduct]!
    vass: [NewOrderVas]!
  }
`
