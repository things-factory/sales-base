import gql from 'graphql-tag'

export const NewVas = gql`
  input NewVas {
    name: String!
    description: String
    defaultPrice: Float!
    currency: String
    uom: String
    operationGuideType: String
    operationGuide: String
  }
`
