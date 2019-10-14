import { Filter, ObjectRef, Pagination, Sorting } from '@things-factory/shell'
import * as ArrivalNotice from './arrival-notice'
import * as CollectionOrder from './collection-order'
import * as DeliveryOrder from './delivery-order'
import * as Invoice from './invoice'
import * as OrderProduct from './order-product'
import * as OrderVas from './order-vas'
import * as OrderInventory from './order-inventory'
import * as PriceList from './price-list'
import * as PurchaseOrder from './purchase-order'
import * as Quotation from './quotation'
import * as QuotationItem from './quotation-item'
import * as QuotationItemOption from './quotation-item-option'
import * as QuotationPromotion from './quotation-promotion'
import * as ShippingOrder from './shipping-order'
import * as TransportOrderDetail from './transport-order-detail'
import * as ReleaseGood from './release-good'
import * as Vas from './vas'
import * as Claim from './claim'
import * as ClaimDetail from './claim-detail'
import * as VasOrder from './vas-order'

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
  TransportOrderDetail.Query,
  CollectionOrder.Query,
  Vas.Query,
  ArrivalNotice.Query,
  OrderProduct.Query,
  OrderVas.Query,
  ReleaseGood.Query,
  Claim.Query,
  ClaimDetail.Query,
  OrderInventory.Query,
  VasOrder.Query
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
  TransportOrderDetail.Mutation,
  CollectionOrder.Mutation,
  Vas.Mutation,
  ArrivalNotice.Mutation,
  OrderProduct.Mutation,
  OrderVas.Mutation,
  ReleaseGood.Mutation,
  Claim.Mutation,
  ClaimDetail.Mutation,
  OrderInventory.Mutation,
  VasOrder.Mutation
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
  ...TransportOrderDetail.Types,
  ...CollectionOrder.Types,
  ...Vas.Types,
  ...ArrivalNotice.Types,
  ...OrderProduct.Types,
  ...OrderVas.Types,
  ...ReleaseGood.Types,
  ...Claim.Types,
  ...ClaimDetail.Types,
  ...OrderInventory.Types,
  ...VasOrder.Types
]
