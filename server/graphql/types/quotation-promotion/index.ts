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
    name: String!
    patch: QuotationPromotionPatch!
  ): QuotationPromotion

  deleteQuotationPromotion (
    name: String!
  ): QuotationPromotion
`

export const Query = `
  quotationPromotions(filters: [Filter], pagination: Pagination, sortings: [Sorting]): QuotationPromotionList
  quotationPromotion(name: String!): QuotationPromotion
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
