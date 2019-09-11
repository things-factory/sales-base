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

  receiveArrivalNotice (
    name: String!
  ): ArrivalNotice

  checkArrivedNotice (
    name: String!
  ): ArrivalNotice

  assignBufferLocation (
    name: String!
    location: ObjectRef!
  ): ArrivalNotice
`

export const Query = `
  arrivalNotices(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeList
  arrivalNotice(name: String!): ArrivalNotice
  arrivalNoticeRequests(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeList
`

export const Types = [ArrivalNotice, NewArrivalNotice, ArrivalNoticePatch, ArrivalNoticeList, GenerateArrivalNotice]
