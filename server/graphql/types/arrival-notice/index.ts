import { ArrivalNotice } from './arrival-notice'
import { NewArrivalNotice } from './new-arrival-notice'
import { ArrivalNoticePatch } from './arrival-notice-patch'
import { ArrivalNoticeList } from './arrival-notice-list'

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
`

export const Query = `
  arrivalNotices(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeList
  arrivalNotice(name: String!): ArrivalNotice
`

export const Types = [ArrivalNotice, NewArrivalNotice, ArrivalNoticePatch, ArrivalNoticeList]
