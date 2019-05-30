import { Invoice } from './invoice'
import { NewInvoice } from './new-invoice'
import { InvoicePatch } from './invoice-patch'

export const Mutation = `
  createInvoice (
    invoice: NewInvoice!
  ): Invoice

  updateInvoice (
    id: String!
    patch: InvoicePatch!
  ): Invoice

  deleteInvoice (
    id: String!
  ): Invoice

  publishInvoice (
    id: String!
  ): Invoice
`

export const Query = `
  invoices: [Invoice]
  invoice(id: String!): Invoice
`

export const Types = [Invoice, NewInvoice, InvoicePatch]
