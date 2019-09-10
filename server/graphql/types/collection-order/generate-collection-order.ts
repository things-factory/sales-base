import { gql } from 'apollo-server-koa'

export const GenerateCollectionOrder = gql`
  input GenerateCollectionOrder {
    collectionOrder: NewCollectionOrder!
    products: [NewOrderProduct]!
    vass: [NewOrderVas]!
  }
`
