import { gql } from 'apollo-server-koa'

export const ArrivalNoticePatch = gql`
  input ArrivalNoticePatch {
    id: String
    name: String
    containerNo: String
    transportFlag: Boolean
    eta: String
    truckNo: String
    status: String
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
    description: String
    cuFlag: String
  }
`
