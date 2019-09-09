import { gql } from 'apollo-server-koa'

export const CollectionOrderPatch = gql`
  input CollectionOrderPatch {
    name: String
    description: String
    from: String
    to: String
    orderProducts: [ObjectRef]
    orderVass: [ObjectRef]
    collectionDateTime: Date
    truckNo: String
    loadType: String
    status: String
    cuFlag: String
  }
`
