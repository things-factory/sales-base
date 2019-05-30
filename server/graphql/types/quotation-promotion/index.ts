import { QuotationPromotion } from './quotation-promotion'
import { NewQuotationPromotion } from './new-quotation-promotion'
import { QuotationPromotionPatch } from './quotation-promotion-patch'

export const Mutation = `
  createQuotationPromotion (
    quotationPromotion: NewQuotationPromotion!
  ): QuotationPromotion

  updateQuotationPromotion (
    id: String!
    patch: QuotationPromotionPatch!
  ): QuotationPromotion

  deleteQuotationPromotion (
    id: String!
  ): QuotationPromotion

  publishQuotationPromotion (
    id: String!
  ): QuotationPromotion
`

export const Query = `
  quotationPromotions: [QuotationPromotion]
  quotationPromotion(id: String!): QuotationPromotion
`

export const Types = [QuotationPromotion, NewQuotationPromotion, QuotationPromotionPatch]
