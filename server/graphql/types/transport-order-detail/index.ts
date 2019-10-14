import { TransportOrderDetail } from './transport-order-detail'
import { NewTransportOrderDetail } from './new-transport-order-detail'
import { TransportOrderDetailPatch } from './transport-order-detail-patch'
import { TransportOrderDetailList } from './transport-order-detail-list'

export const Mutation = `
  createTransportOrderDetail (
    transportOrderDetail: NewTransportOrderDetail!
  ): TransportOrderDetail

  updateTransportOrderDetail (
    name: String!
    patch: TransportOrderDetailPatch!
  ): TransportOrderDetail

  deleteTransportOrderDetail (
    name: String!
  ): Boolean

  deleteTransportOrderDetails (
    names: [String]!
  ): Boolean
`

export const Query = `
  transportOrderDetails(filters: [Filter], pagination: Pagination, sortings: [Sorting]): TransportOrderDetailList
  transportOrderDetail(name: String!): TransportOrderDetail
`

export const Types = [
  TransportOrderDetail,
  NewTransportOrderDetail,
  TransportOrderDetailPatch,
  TransportOrderDetailList
]
