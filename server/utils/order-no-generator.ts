import uuid from 'uuid/v4'

export class OrderNoGenerator {
  static arrivalNotice() {
    return uuid()
  }

  static collectionOrder() {
    return uuid()
  }

  static orderProduct(orderName: String, productBatchId: String, productSeq: Number) {
    return `${orderName}-${productBatchId}-${productSeq}`
  }

  static orderVas(orderName: String, batchId: String) {
    return `${orderName}-${batchId}`
  }
}