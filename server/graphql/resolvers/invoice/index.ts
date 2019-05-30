import { invoiceResolver } from './invoice'
import { invoicesResolver } from './invoices'

import { updateInvoice } from './update-invoice'
import { createInvoice } from './create-invoice'
import { deleteInvoice } from './delete-invoice'

export const Query = {
  ...invoicesResolver,
  ...invoiceResolver
}

export const Mutation = {
  ...updateInvoice,
  ...createInvoice,
  ...deleteInvoice
}
