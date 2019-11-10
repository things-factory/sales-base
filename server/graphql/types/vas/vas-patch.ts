import gql from 'graphql-tag'

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
