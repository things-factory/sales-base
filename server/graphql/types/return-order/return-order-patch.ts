import gql from 'graphql-tag'

export const ReturnOrderPatch = gql`
  input ReturnOrderPatch {
    id: String
    name: String
    description: String
    bizplace: ObjectRef
    ownTransport: Boolean
    eta: String
    etaDate: String
    truckNo: String
    deliveryOrderNo: String
    refNo: String
    jobSheet: ObjectRef
    orderInventories: [ObjectRef]
    orderVass: [ObjectRef]
    remark: String
    status: String
  }
`
