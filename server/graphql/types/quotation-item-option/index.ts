import { QuotationItemOption } from './quotation-item-option'
import { NewQuotationItemOption } from './new-quotation-item-option'
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
  quotationItemOptions: [QuotationItemOption]
  quotationItemOption(id: String!): QuotationItemOption
`

export const Types = [QuotationItemOption, NewQuotationItemOption, QuotationItemOptionPatch]
