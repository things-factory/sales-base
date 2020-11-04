import { ArrivalNotice } from './arrival-notice'
import { CollectionOrder } from './collection-order'
import { DeliveryOrder } from './delivery-order'
import { Invoice } from './invoice'
import { InventoryCheck } from './inventory-check'
import { JobSheet } from './job-sheet'
import { OrderProduct } from './order-product'
import { OrderInventory } from './order-inventory'
import { OrderVas } from './order-vas'
import { PriceList } from './price-list'
import { PurchaseOrder } from './purchase-order'
import { Quotation } from './quotation'
import { QuotationItem } from './quotation-item'
import { QuotationItemOption } from './quotation-item-option'
import { QuotationPromotion } from './quotation-promotion'
import { ReleaseGood } from './release-good'
import { ShippingOrder } from './shipping-order'
import { Vas } from './vas'
import { Claim } from './claim'
import { ClaimDetail } from './claim-detail'
import { ClaimOrder } from './claim-order'
import { VasOrder } from './vas-order'
import { GoodsReceivalNote } from './goods-receival-note'
import { ReturnOrder } from './return-order'

export const entities = [
  ArrivalNotice,
  OrderProduct,
  OrderVas,
  OrderInventory,
  Quotation,
  QuotationItem,
  QuotationItemOption,
  QuotationPromotion,
  Invoice,
  InventoryCheck,
  JobSheet,
  PriceList,
  PurchaseOrder,
  DeliveryOrder,
  CollectionOrder,
  ShippingOrder,
  ReleaseGood,
  Vas,
  Claim,
  ClaimDetail,
  ClaimOrder,
  VasOrder,
  GoodsReceivalNote,
  ReturnOrder
]

export {
  ArrivalNotice,
  OrderProduct,
  OrderVas,
  OrderInventory,
  Quotation,
  QuotationItem,
  QuotationItemOption,
  QuotationPromotion,
  Invoice,
  JobSheet,
  InventoryCheck,
  PriceList,
  PurchaseOrder,
  DeliveryOrder,
  CollectionOrder,
  ShippingOrder,
  ReleaseGood,
  Vas,
  Claim,
  ClaimDetail,
  ClaimOrder,
  VasOrder,
  GoodsReceivalNote,
  ReturnOrder
}
