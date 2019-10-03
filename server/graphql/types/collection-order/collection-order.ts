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
    refNo: String
    transportVehicle: TransportVehicle
    transportDriver: TransportDriver
    collectionDateTime: String
    collectionDate: String
    loadType: String
    remark: String
    telNo: String
    status: String
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
