import * as ArrivalNotice from './arrival-notice'
import * as CollectionOrder from './collection-order'
import * as DeliveryOrder from './delivery-order'
import * as Invoice from './invoice'
import * as InventoryCheck from './inventory-check'
import * as JobSheet from './job-sheet'
import * as OrderProduct from './order-product'
import * as OrderInventory from './order-inventory'
import * as OrderVas from './order-vas'
import * as PriceList from './price-list'
import * as PurchaseOrder from './purchase-order'
import * as Quotation from './quotation'
import * as QuotationItem from './quotation-item'
import * as QuotationItemOption from './quotation-item-option'
import * as QuotationPromotion from './quotation-promotion'
import * as ShippingOrder from './shipping-order'
import * as ReleaseGood from './release-good'
import * as ReturnOrder from './return-order'
import * as Vas from './vas'
import * as Claim from './claim'
import * as ClaimDetail from './claim-detail'
import * as ClaimOrder from './claim-order'
import * as VasOrder from './vas-order'
import * as GoodsReceivalNote from './goods-receival-note'

export const queries = [
  Quotation.Query,
  QuotationItem.Query,
  QuotationItemOption.Query,
  QuotationPromotion.Query,
  Invoice.Query,
  InventoryCheck.Query,
  JobSheet.Query,
  PriceList.Query,
  PurchaseOrder.Query,
  DeliveryOrder.Query,
  ShippingOrder.Query,
  CollectionOrder.Query,
  Vas.Query,
  ArrivalNotice.Query,
  OrderProduct.Query,
  OrderInventory.Query,
  OrderVas.Query,
  ReleaseGood.Query,
  ReturnOrder.Query,
  Claim.Query,
  ClaimDetail.Query,
  ClaimOrder.Query,
  VasOrder.Query,
  GoodsReceivalNote.Query
]

export const mutations = [
  Quotation.Mutation,
  QuotationItem.Mutation,
  QuotationItemOption.Mutation,
  QuotationPromotion.Mutation,
  Invoice.Mutation,
  JobSheet.Mutation,
  InventoryCheck.Mutation,
  PriceList.Mutation,
  PurchaseOrder.Mutation,
  DeliveryOrder.Mutation,
  ShippingOrder.Mutation,
  CollectionOrder.Mutation,
  Vas.Mutation,
  ArrivalNotice.Mutation,
  OrderProduct.Mutation,
  OrderInventory.Mutation,
  OrderVas.Mutation,
  ReleaseGood.Mutation,
  ReturnOrder.Mutation,
  Claim.Mutation,
  ClaimDetail.Mutation,
  ClaimOrder.Mutation,
  VasOrder.Mutation,
  GoodsReceivalNote.Mutation
]
