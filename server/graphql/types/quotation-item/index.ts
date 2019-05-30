import { QuotationItem } from './quotation-item'
import { NewQuotationItem } from './new-quotation-item'
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
  quotationItems: [QuotationItem]
  quotationItem(id: String!): QuotationItem
`

export const Types = [QuotationItem, NewQuotationItem, QuotationItemPatch]
