import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { NewQuotationItemOption } from './new-quotation-item-option'
import { QuotationItemOption } from './quotation-item-option'
import { QuotationItemOptionList } from './quotation-item-option-list'
import { QuotationItemOptionPatch } from './quotation-item-option-patch'

export const Mutation = `
  createQuotationItemOption (
    quotationItemOption: NewQuotationItemOption!
  ): QuotationItemOption

  updateQuotationItemOption (
    id: String!
    patch: QuotationItemOptionPatch!
  ): QuotationItemOption

  deleteQuotationItemOption (
    id: String!
  ): QuotationItemOption

  publishQuotationItemOption (
    id: String!
  ): QuotationItemOption
`

export const Query = `
  quotationItemOptions(filters: [Filter], pagination: Pagination, sortings: [Sorting]): QuotationItemOptionList
  quotationItemOption(id: String!): QuotationItemOption
`

export const Types = [
  Filter,
  Pagination,
  Sorting,
  QuotationItemOption,
  NewQuotationItemOption,
  QuotationItemOptionPatch,
  QuotationItemOptionList
]
