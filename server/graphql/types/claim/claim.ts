import { gql } from 'apollo-server-koa'

export const Claim = gql`
  type Claim {
    id: String
    name: String
    domain: Domain
    description: String
    orderName: String
    billingMode: String
    transportDriverName: String
    transportVehicleName: String
    from: String
    to: String
    orderDate: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
    collectionOrder: CollectionOrder
    deliveryOrder: DeliveryOrder
    claimDetails: [ClaimDetail]
  }
`
