import { gql } from 'apollo-server-koa'

export const VasPatch = gql`
  input VasPatch {
    id: String
    name: String
    description: String
    currency: String
    defaultPrice: Float
    operationGuideType: String
    operationGuide: String
    cuFlag: String
  }
`
