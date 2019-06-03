import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { NewQuotationPromotion } from './new-quotation-promotion'
import { QuotationPromotion } from './quotation-promotion'
import { QuotationPromotionList } from './quotation-promotion-list'
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
  quotationPromotions(filters: [Filter], pagination: Pagination, sortings: [Sorting]): QuotationPromotionList
  quotationPromotion(id: String!): QuotationPromotion
`

export const Types = [
  Filter,
  Pagination,
  Sorting,
  QuotationPromotion,
  NewQuotationPromotion,
  QuotationPromotionPatch,
  QuotationPromotionList
]
