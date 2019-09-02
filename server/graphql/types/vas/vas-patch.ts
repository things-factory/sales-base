import { gql } from 'apollo-server-koa'

export const VasPatch = gql`
  input VasPatch {
    id: String
    bizplace: ObjectRef
    name: String
    description: String
    defaultPrice: Float
    cuFlag: String
  }
`
