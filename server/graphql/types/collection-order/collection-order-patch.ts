import { gql } from 'apollo-server-koa'

export const CollectionOrderPatch = gql`
  input CollectionOrderPatch {
    id: String
    name: String
    description: String
    from: String
    to: String
    refNo: String
    loadWeight: Float
    urgency: Boolean
    cargoType: String
    otherCargo: String
    collectionDateTime: String
    collectionDate: String
    transportVehicle: ObjectRef
    transportDriver: ObjectRef
    telNo: String
    remark: String
    truckNo: String
    status: String
  }
`
