export const ORDER_STATUS = {
  PENDING: 'PENDING',
  EDITING: 'EDITING',
  PENDING_RECEIVE: 'PENDING_RECEIVE',
  INTRANSIT: 'INTRANSIT',
  COLLECTING: 'COLLECTING',
  DELIVERING: 'DELIVERING',
  READY_TO_DISPATCH: 'READY_TO_DISPATCH',
  READY_TO_EXECUTE: 'READY_TO_EXECUTE',
  ARRIVED: 'ARRIVED',
  READY_TO_UNLOAD: 'READY_TO_UNLOAD',
  READY_TO_LOAD: 'READY_TO_LOAD',
  READY_TO_PICK: 'READY_TO_PICK',
  READY_TO_PUTAWAY: 'READY_TO_PUTAWAY',
  PUTTING_AWAY: 'PUTTING_AWAY',
  PICKING: 'PICKING',
  LOADING: 'LOADING',
  PROCESSING: 'PROCESSING',
  EXECUTING: 'EXECUTING',
  PARTIAL_RETURN: 'PARTIAL_RETURN',
  DONE: 'DONE',
  INPROCESS: 'INPROCESS',
  REJECTED: 'REJECTED',
  SHIPPING: 'SHIPPING'
}

export const ORDER_PRODUCT_STATUS = {
  READY_TO_APPROVED: 'READY_TO_APPROVED',
  PENDING: 'PENDING',
  PENDING_RECEIVE: 'PENDING_RECEIVE',
  REJECTED: 'REJECTED',
  INTRANSIT: 'INTRANSIT',
  ARRIVED: 'ARRIVED',
  READY_TO_COLLECT: 'READY_TO_COLLECT',
  READY_TO_DELIVER: 'READY_TO_DELIVER',
  READY_TO_UNLOAD: 'READY_TO_UNLOAD',
  READY_TO_PICK: 'READY_TO_PICK',
  PICKING: 'PICKING',
  UNLOADING: 'UNLOADING',
  UNLOADED: 'UNLOADED',
  COLLECTED: 'COLLECTED',
  DELIVERED: 'DELIVERED',
  PUTTING_AWAY: 'PUTTING_AWAY',
  STORED: 'STORED',
  TERMINATED: 'TERMINATED'
}

export const ORDER_INVENTORY_STATUS = {
  PENDING: 'PENDING',
  PENDING_RECEIVE: 'PENDING_RECEIVE',
  READY_TO_PICK: 'READY_TO_PICK',
  READY_TO_RETURN: 'READY_TO_RETURN',
  PICKING: 'PICKING',
  LOADING: 'LOADING',
  PICKED: 'PICKED',
  LOADED: 'LOADED',
  REJECTED: 'REJECTED',
  RELEASED: 'RELEASED',
  DELIVERING: 'DELIVERING',
  RETURNING: 'RETURNING',
  TERMINATED: 'TERMINATED',
  DONE: 'DONE'
}

export const ORDER_VAS_STATUS = {
  PENDING: 'PENDING',
  PENDING_RECEIVE: 'PENDING_RECEIVE',
  REJECTED: 'REJECTED',
  INTRANSIT: 'INTRANSIT',
  ARRIVED: 'ARRIVED',
  READY_TO_PROCESS: 'READY_TO_PROCESS',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  TERMINATED: 'TERMINATED'
}

export const ORDER_TYPES = {
  ARRIVAL_NOTICE: 'ARRIVAL_NOTICE',
  SHIPPING: 'SHIPPING_ORDER',
  DELIVERY: 'DELIVERY',
  COLLECTION: 'COLLECTION',
  RELEASE_OF_GOODS: 'RELEASE_OF_GOODS',
  VAS_ORDER: 'VAS_ORDER'
}

export const GRN_STATUS = {
  PENDING_PROCESS: 'PENDING_PROCESS',
  SUBMITTED: 'SUBMITTED',
  RECEIVED: 'RECEIVED',
  NEW: 'NEW',
  OPENED: 'OPENED'
}
