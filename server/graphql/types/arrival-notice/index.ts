import { ArrivalNotice } from './arrival-notice'
import { ArrivalNoticeList } from './arrival-notice-list'
import { ArrivalNoticePatch } from './arrival-notice-patch'
import { GenerateArrivalNotice } from './generate-arrival-notice'
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
    arrivalNotice: GenerateArrivalNotice!
  ): ArrivalNotice

  editArrivalNotice (
    name: String!
    arrivalNotice: GenerateArrivalNotice!
  ): ArrivalNotice

  confirmArrivalNotice (
    name: String!
  ): ArrivalNotice
`

export const Query = `
  arrivalNotices(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeList
  arrivalNotice(name: String!): ArrivalNotice
  requestedArrivalNotices(filters: [Filter], pagination: Pagination, sorting: [Sorting]): ArrivalNoticeList
`

export const Types = [ArrivalNotice, NewArrivalNotice, ArrivalNoticePatch, ArrivalNoticeList, GenerateArrivalNotice]
