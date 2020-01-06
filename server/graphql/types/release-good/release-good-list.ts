import gql from 'graphql-tag'

export const ReleaseGoodList = gql`
  type ReleaseGoodList {
    items: [ReleaseGood]
    total: Int
  }
`
