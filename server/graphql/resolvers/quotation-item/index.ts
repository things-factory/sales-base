import { quotationItemResolver } from './quotation-item'
import { quotationItemsResolver } from './quotation-items'

import { updateQuotationItem } from './update-quotation-item'
import { createQuotationItem } from './create-quotation-item'
import { deleteQuotationItem } from './delete-quotation-item'

export const Query = {
  ...quotationItemsResolver,
  ...quotationItemResolver
}

export const Mutation = {
  ...updateQuotationItem,
  ...createQuotationItem,
  ...deleteQuotationItem
}
