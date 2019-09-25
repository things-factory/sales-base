import * as ArrivalNotice from './arrival-notice'
import * as CollectionOrder from './collection-order'
import * as DeliveryOrder from './delivery-order'
import * as Invoice from './invoice'
import * as OrderProduct from './order-product'
import * as OrderVas from './order-vas'
import * as PriceList from './price-list'
import * as Product from './product'
import * as ProductOption from './product-option'
import * as ProductOptionDetail from './product-option-detail'
import * as PurchaseOrder from './purchase-order'
import * as Quotation from './quotation'
import * as QuotationItem from './quotation-item'
import * as QuotationItemOption from './quotation-item-option'
import * as QuotationPromotion from './quotation-promotion'
import * as ShippingOrder from './shipping-order'
import * as ReleaseGood from './release-good'
import * as Vas from './vas'

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
  Vas.Query,
  ArrivalNotice.Query,
  OrderProduct.Query,
  OrderVas.Query,
  ReleaseGood.Query
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
  Vas.Mutation,
  ArrivalNotice.Mutation,
  OrderProduct.Mutation,
  OrderVas.Mutation,
  ReleaseGood.Mutation
]
