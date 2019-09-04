import { gql } from 'apollo-server-koa'

export const ArrivalNoticePatch = gql`
  input ArrivalNoticePatch {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean
    eta: String
    pickingDateTime: String
    truckNo: String
    status: String
    arrivalNoticeProducts: [ObjectRef]
    arrivalNoticeVass: [ObjectRef]
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
  }
`
