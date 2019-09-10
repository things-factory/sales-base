import { gql } from 'apollo-server-koa'

export const CollectionOrder = gql`
  type CollectionOrder {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    from: String
    to: String
    truckNo: String
    orderProducts: [OrderProduct]
    orderVass: [OrderVas]
    collectionDateTime: String
    loadType: String
    telNo: String
    status: String
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
