import { Quotation } from './quotation'
import { NewQuotation } from './new-quotation'
import { QuotationPatch } from './quotation-patch'

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
  quotations: [Quotation]
  quotation(id: String!): Quotation
`

export const Types = [Quotation, NewQuotation, QuotationPatch]
