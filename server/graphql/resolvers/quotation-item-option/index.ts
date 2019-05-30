import { quotationItemOptionResolver } from './quotation-item-option'
import { quotationItemOptionsResolver } from './quotation-item-options'

import { updateQuotationItemOption } from './update-quotation-item-option'
import { createQuotationItemOption } from './create-quotation-item-option'
import { deleteQuotationItemOption } from './delete-quotation-item-option'

export const Query = {
  ...quotationItemOptionsResolver,
  ...quotationItemOptionResolver
}

export const Mutation = {
  ...updateQuotationItemOption,
  ...createQuotationItemOption,
  ...deleteQuotationItemOption
}
