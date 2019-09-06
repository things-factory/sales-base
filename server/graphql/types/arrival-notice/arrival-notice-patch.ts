import { gql } from 'apollo-server-koa'

export const ArrivalNoticePatch = gql`
  input ArrivalNoticePatch {
    name: String
    description: String
    containerNo: String
    ownTransport: Boolean
    eta: String
    pickingDateTime: String
    from: String
    truckNo: String
    loadType: String
    status: String
    arrivalNoticeProducts: [ObjectRef]
    arrivalNoticeVass: [ObjectRef]
    collectionOrder: ObjectRef
    deliveryOrderNo: String
  }
`
