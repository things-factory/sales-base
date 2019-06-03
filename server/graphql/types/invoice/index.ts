import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { Invoice } from './invoice'
import { InvoiceList } from './invoice-list'
import { InvoicePatch } from './invoice-patch'
import { NewInvoice } from './new-invoice'

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
  invoices(filters: [Filter], pagination: Pagination, sortings: [Sorting]): InvoiceList
  invoice(id: String!): Invoice
`

export const Types = [Filter, Pagination, Sorting, Invoice, NewInvoice, InvoicePatch, InvoiceList]
