import { ArrivalNoticeVas } from './arrival-notice-vas'
import { NewArrivalNoticeVas } from './new-arrival-notice-vas'
import { ArrivalNoticeVasPatch } from './arrival-notice-vas-patch'
import { ArrivalNoticeVasList } from './arrival-notice-vas-list'

export const Mutation = `
  createArrivalNoticeVas (
    arrivalNoticeVas: NewArrivalNoticeVas!
  ): ArrivalNoticeVas

  updateArrivalNoticeVas (
    name: String!
    patch: ArrivalNoticeVasPatch!
  ): ArrivalNoticeVas

  updateMultipleArrivalNoticeVas (
    patches: [ArrivalNoticeVasPatch]!
  ): [ArrivalNoticeVas]

  deleteArrivalNoticeVas (
    name: String!
  ): Boolean

  deleteArrivalNoticeVas (
    names: [String]!
  ): Boolean
`

export const Query = `
  arrivalNoticeVas(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeVasList
  arrivalNoticeVas(arrivalNotice: ObjectRef!, name: String!): ArrivalNoticeVas
`

export const Types = [ArrivalNoticeVas, NewArrivalNoticeVas, ArrivalNoticeVasPatch, ArrivalNoticeVasList]
