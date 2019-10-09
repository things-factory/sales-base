import { gql } from 'apollo-server-koa'

export const Claim = gql`
  type Claim {
    id: String
    name: String
    domain: Domain
    description: String
    billingMode: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
    collectionOrder: CollectionOrder
    deliveryOrder: DeliveryOrder
    claimDetails: [ClaimDetail]
  }
`
