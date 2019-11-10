import gql from 'graphql-tag'

export const VasList = gql`
  type VasList {
    items: [Vas]
    total: Int
  }
`
