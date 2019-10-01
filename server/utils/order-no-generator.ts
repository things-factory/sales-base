import uuid from 'uuid/v4'

export class OrderNoGenerator {
  static arrivalNotice() {
    const currentDate = new Date()
    return `GAN-${currentDate.getFullYear()}${currentDate.getMonth() +
      1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`
  }

  static collectionOrder() {
    const currentDate = new Date()
    return `CO-${currentDate.getFullYear()}${currentDate.getMonth() +
      1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`
  }

  static deliveryOrder() {
    const currentDate = new Date()
    return `DO-${currentDate.getFullYear()}${currentDate.getMonth() +
      1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`
  }

  static shippingOrder() {
    const currentDate = new Date()
    return `SO-${currentDate.getFullYear()}${currentDate.getMonth() +
      1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`
  }

  static releaseGood() {
    const currentDate = new Date()
    return `RO-${currentDate.getFullYear()}${currentDate.getMonth() +
      1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`
  }

  static orderProduct() {
    return `OP-${uuid()}`
  }

  static orderInventory() {
    return uuid()
  }

  static releaseVas() {
    return uuid()
  }

  static orderVas() {
    return `OV-${uuid()}`
  }
}
