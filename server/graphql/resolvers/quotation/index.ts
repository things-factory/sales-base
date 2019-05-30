import { quotationResolver } from './quotation'
import { quotationsResolver } from './quotations'

import { updateQuotation } from './update-quotation'
import { createQuotation } from './create-quotation'
import { deleteQuotation } from './delete-quotation'

export const Query = {
  ...quotationsResolver,
  ...quotationResolver
}

export const Mutation = {
  ...updateQuotation,
  ...createQuotation,
  ...deleteQuotation
}
