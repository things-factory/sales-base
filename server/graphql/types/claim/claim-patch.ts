import gql from 'graphql-tag'

export const ClaimPatch = gql`
  input ClaimPatch {
    id: String
    name: String
    description: String
    cuFlag: String
    billingMode: String
    charges: Float
    transportDriver: String
    transportVehicle: String
    from: String
    to: String
    remark: String
    bizplace: String
    status: String
    drum: Float
    pallet: Float
    carton: Float
    bag: Float
    other: Float
    claimDetails: [ClaimDetailPatch]
    claimOrders: [ClaimOrderPatch]
  }
`
