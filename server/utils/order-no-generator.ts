const currentDate = new Date()

export class OrderNoGenerator {
  static arrivalNotice() {
    return `GAN-${currentDate.getFullYear()}${currentDate.getMonth() +
      1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`
  }

  static collectionOrder() {
    return `CO-${currentDate.getFullYear()}${currentDate.getMonth() +
      1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`
  }

  static deliveryOrder() {
    return `DO-${currentDate.getFullYear()}${currentDate.getMonth() +
      1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`
  }

  static orderProduct(orderName: String, productBatchId: String, productSeq: Number) {
    return `${orderName}-${productBatchId}-${productSeq}`
  }

  static orderVas(orderName: String, batchId: String, vasName: String) {
    return `${orderName}-${batchId}-${vasName}`
  }
}
