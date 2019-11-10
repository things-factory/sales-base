import gql from 'graphql-tag'

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
    charges: Float
    bizplace: Bizplace
    transportDriver: TransportDriver
    transportVehicle: TransportVehicle
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
    claimDetails: [ClaimDetail]
  }
`
