import { gql } from 'apollo-server-koa'

export const GenerateReleaseGood = gql`
  input GenerateReleaseGood {
    releaseGood: NewReleaseGood!
    inventories: [NewOrderInventory]!
    vass: [NewOrderVas]!
  }
`
