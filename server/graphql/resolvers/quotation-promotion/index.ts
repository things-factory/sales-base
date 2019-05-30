import { quotationPromotionResolver } from './quotation-promotion'
import { quotationPromotionsResolver } from './quotation-promotions'

import { updateQuotationPromotion } from './update-quotation-promotion'
import { createQuotationPromotion } from './create-quotation-promotion'
import { deleteQuotationPromotion } from './delete-quotation-promotion'

export const Query = {
  ...quotationPromotionsResolver,
  ...quotationPromotionResolver
}

export const Mutation = {
  ...updateQuotationPromotion,
  ...createQuotationPromotion,
  ...deleteQuotationPromotion
}
