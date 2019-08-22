import * as Quotation from './quotation'
import * as QuotationItem from './quotation-item'
import * as QuotationItemOption from './quotation-item-option'
import * as QuotationPromotion from './quotation-promotion'
import * as Invoice from './invoice'
import * as PriceList from './price-list'
import * as PurchaseOrder from './purchase-order'
import * as DeliveryOrder from './delivery-order'
import * as ShippingOrder from './shipping-order'
import * as CollectionOrder from './collection-order'
import * as Product from './product'
import * as ProductOption from './product-option'
import * as ProductOptionDetail from './product-option-detail'
import * as ProductBatch from './product-batch'
import { Filter, Pagination, Sorting, ObjectRef } from '@things-factory/shell'

export const queries = [
  Quotation.Query,
  QuotationItem.Query,
  QuotationItemOption.Query,
  QuotationPromotion.Query,
  Invoice.Query,
  PriceList.Query,
  PurchaseOrder.Query,
  DeliveryOrder.Query,
  ShippingOrder.Query,
  CollectionOrder.Query,
  Product.Query,
  ProductOption.Query,
  ProductOptionDetail.Query,
  ProductBatch.Query
]

export const mutations = [
  Quotation.Mutation,
  QuotationItem.Mutation,
  QuotationItemOption.Mutation,
  QuotationPromotion.Mutation,
  Invoice.Mutation,
  PriceList.Mutation,
  PurchaseOrder.Mutation,
  DeliveryOrder.Mutation,
  ShippingOrder.Mutation,
  CollectionOrder.Mutation,
  Product.Mutation,
  ProductOption.Mutation,
  ProductOptionDetail.Mutation,
  ProductBatch.Mutation
]

export const types = [
  Filter,
  Pagination,
  Sorting,
  ObjectRef,
  ...Quotation.Types,
  ...QuotationItem.Types,
  ...QuotationItemOption.Types,
  ...QuotationPromotion.Types,
  ...Invoice.Types,
  ...PriceList.Types,
  ...PurchaseOrder.Types,
  ...DeliveryOrder.Types,
  ...ShippingOrder.Types,
  ...CollectionOrder.Types,
  ...Product.Types,
  ...ProductOption.Types,
  ...ProductOptionDetail.Types,
  ...ProductBatch.Types
]
