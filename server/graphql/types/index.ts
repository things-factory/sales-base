import * as Quotation from './quotation'
import * as QuotationItem from './quotation-item'
import * as QuotationItemOption from './quotation-item-option'
import * as QuotationPromotion from './quotation-promotion'
import * as Invoice from './invoice'
import * as PriceList from './price-list'
import * as PurchaseOrder from './purchase-order'

export const queries = [
  Quotation.Query,
  QuotationItem.Query,
  QuotationItemOption.Query,
  QuotationPromotion.Query,
  Invoice.Query,
  PriceList.Query,
  PurchaseOrder.Query
]

export const mutations = [
  Quotation.Mutation,
  QuotationItem.Mutation,
  QuotationItemOption.Mutation,
  QuotationPromotion.Mutation,
  Invoice.Mutation,
  PriceList.Mutation,
  PurchaseOrder.Mutation
]

export const types = [
  ...Quotation.Types,
  ...QuotationItem.Types,
  ...QuotationItemOption.Types,
  ...QuotationPromotion.Types,
  ...Invoice.Types,
  ...PriceList.Types,
  ...PurchaseOrder.Types
]
