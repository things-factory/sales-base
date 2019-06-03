import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { NewQuotationItem } from './new-quotation-item'
import { QuotationItem } from './quotation-item'
import { QuotationItemList } from './quotation-item-list'
import { QuotationItemPatch } from './quotation-item-patch'

export const Mutation = `
  createQuotationItem (
    quotationItem: NewQuotationItem!
  ): QuotationItem

  updateQuotationItem (
    id: String!
    patch: QuotationItemPatch!
  ): QuotationItem

  deleteQuotationItem (
    id: String!
  ): QuotationItem

  publishQuotationItem (
    id: String!
  ): QuotationItem
`

export const Query = `
  quotationItems(filters: [Filter], pagination: Pagination, sortings: [Sorting]): QuotationItemList
  quotationItem(id: String!): QuotationItem
`

export const Types = [
  Filter,
  Pagination,
  Sorting,
  QuotationItem,
  NewQuotationItem,
  QuotationItemPatch,
  QuotationItemList
]
