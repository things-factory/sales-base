import { createQuotation } from './create-quotation'
import { deleteQuotation } from './delete-quotation'
import { quotationResolver } from './quotation'
import { quotationsResolver } from './quotations'
import { updateQuotation } from './update-quotation'

export const Query = {
  ...quotationsResolver,
  ...quotationResolver
}

export const Mutation = {
  ...updateQuotation,
  ...createQuotation,
  ...deleteQuotation
}
