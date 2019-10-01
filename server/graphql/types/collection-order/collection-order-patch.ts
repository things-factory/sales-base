import { gql } from 'apollo-server-koa'

export const CollectionOrderPatch = gql`
  input CollectionOrderPatch {
    id: String
    name: String
    description: String
    from: String
    to: String
    orderProducts: [ObjectRef]
    orderVass: [ObjectRef]
    collectionDateTime: String
    collectionDate: String
    transportVehicle: ObjectRef
    transportDriver: ObjectRef
    telNo: String
    remark: String
    truckNo: String
    loadType: String
    status: String
  }
`
