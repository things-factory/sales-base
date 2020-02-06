import { ArrivalNotice } from './arrival-notice'
import { ArrivalNoticeList } from './arrival-notice-list'
import { ArrivalNoticePatch } from './arrival-notice-patch'
import { NewArrivalNotice } from './new-arrival-notice'

export const Mutation = `
  createArrivalNotice (
    arrivalNotice: NewArrivalNotice!
  ): ArrivalNotice

  updateArrivalNotice (
    name: String!
    patch: ArrivalNoticePatch!
  ): ArrivalNotice

  deleteArrivalNotice (
    name: String!
  ): Boolean

  generateArrivalNotice (
    arrivalNotice: NewArrivalNotice!
  ): ArrivalNotice

  confirmArrivalNotice (
    name: String!
  ): ArrivalNotice

  receiveArrivalNotice (
    name: String!
  ): ArrivalNotice

  checkArrivedNotice (
    name: String!
  ): ArrivalNotice

  rejectArrivalNotice (
    name: String!
    patch: ArrivalNoticePatch!
  ): ArrivalNotice

  addArrivalNoticeProducts (
    ganNo: String!
    orderProducts: [NewOrderProduct]!
  ): Boolean
`

export const Query = `
  arrivalNotices(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeList
  arrivalNotice(name: String!): ArrivalNotice
  arrivalNoticeRequests(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeList
  customerArrivalNotices(bizplace: String!): [ArrivalNotice]
`

export const Types = [ArrivalNotice, NewArrivalNotice, ArrivalNoticePatch, ArrivalNoticeList]
