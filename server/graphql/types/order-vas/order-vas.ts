import { gql } from 'apollo-server-koa'

export const OrderVas = gql`
  type OrderVas {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    batchId: String
    arrivalNotice: ArrivalNotice
    collectionOrder: CollectionOrder
    deliveryOrder: DeliveryOrder
    releaseGood: ReleaseGood
    shippingOrder: ShippingOrder
    vas: Vas
    remark: String
    description: String
    status: String
    createdAt: String
    updatedAt: String
    creator: User
    updater: User
  }
`
