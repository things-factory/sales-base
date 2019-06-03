import { Quotation } from './quotation'
import { NewQuotation } from './new-quotation'
import { QuotationPatch } from './quotation-patch'
import { QuotationList } from './quotation-list'
import { Filter, Pagination, Sorting } from '@things-factory/shell'

export const Mutation = `
  createQuotation (
    quotation: NewQuotation!
  ): Quotation

  updateQuotation (
    id: String!
    patch: QuotationPatch!
  ): Quotation

  deleteQuotation (
    id: String!
  ): Quotation

  publishQuotation (
    id: String!
  ): Quotation
`

export const Query = `
  quotations(filters: [Filter], pagination: Pagination, sortings: [Sorting]): QuotationList
  quotation(id: String!): Quotation
`

export const Types = [Filter, Pagination, Sorting, Quotation, NewQuotation, QuotationPatch, QuotationList]
