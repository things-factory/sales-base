import gql from 'graphql-tag'

export const CollectionOrderPatch = gql`
  input CollectionOrderPatch {
    id: String
    name: String
    description: String
    from: String
    to: String
    refNo: String
    loadWeight: Float
    urgency: Boolean
    looseItem: Boolean
    cargoType: String
    collectionDateTime: String
    collectionDate: String
    arrivalNotice: ObjectRef
    transportOrderDetails: [NewTransportOrderDetail]
    telNo: String
    remark: String
    truckNo: String
    status: String
  }
`
