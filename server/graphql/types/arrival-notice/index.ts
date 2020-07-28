import { ArrivalNotice } from './arrival-notice'
import { ArrivalNoticeList } from './arrival-notice-list'
import { ArrivalNoticePatch } from './arrival-notice-patch'
import { NewArrivalNotice } from './new-arrival-notice'

export const Mutation = /* GraphQL */ `
  createArrivalNotice (
    arrivalNotice: NewArrivalNotice!
  ): ArrivalNotice @priviledge(category: "order_customer", priviledge: "mutation")

  updateArrivalNotice (
    name: String!
    patch: ArrivalNoticePatch!
  ): ArrivalNotice @priviledge(category: "order", priviledge: "mutation")

  deleteArrivalNotice (
    name: String!
  ): Boolean @priviledge(category: "order_customer", priviledge: "mutation")

  generateArrivalNotice (
    arrivalNotice: NewArrivalNotice!
    file: Upload
  ): ArrivalNotice @priviledge(category: "order_customer", priviledge: "mutation")

  confirmArrivalNotice (
    name: String!
  ): ArrivalNotice @priviledge(category: "order_customer", priviledge: "mutation")

  receiveArrivalNotice (
    name: String!
  ): ArrivalNotice @priviledge(category: "order_warehouse", priviledge: "mutation")

  checkArrivedNotice (
    name: String!
  ): ArrivalNotice @priviledge(category: "order_warehouse", priviledge: "mutation")

  rejectArrivalNotice (
    name: String!
    patch: ArrivalNoticePatch!
  ): ArrivalNotice @priviledge(category: "order_warehouse", priviledge: "mutation")

  addArrivalNoticeProducts (
    ganNo: String!
    orderProducts: [NewOrderProduct]!
  ): Boolean @priviledge(category: "order_warehouse", priviledge: "mutation")
`

export const Query = /* GraphQL */ `
  arrivalNotices(
    filters: [Filter],
    pagination: Pagination,sortings: [Sorting]
  ): ArrivalNoticeList @priviledge(category: "order_customer", priviledge: "query")

  arrivalNotice(
    name: String!
  ): ArrivalNotice @priviledge(category: "order", priviledge: "query")

  arrivalNoticeRequests(
    filters: [Filter],
    pagination: Pagination,
    sortings: [Sorting]
  ): ArrivalNoticeList @priviledge(category: "order_warehouse", priviledge: "query")

  bizplaceArrivalNotices(arrivalNotice: ArrivalNoticePatch, filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeList
`

export const Types = [ArrivalNotice, NewArrivalNotice, ArrivalNoticePatch, ArrivalNoticeList]
