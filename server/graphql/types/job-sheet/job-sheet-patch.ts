import { gql } from 'apollo-server-koa'

export const JobSheetPatch = gql`
  input JobSheetPatch {
    name: String
    description: String
    containerMtDate: String
    sumPackQty: Int
    sumPalletQty: Int
  }
`
