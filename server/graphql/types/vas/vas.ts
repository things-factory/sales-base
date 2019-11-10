import gql from 'graphql-tag'

export const Vas = gql`
  type Vas {
    id: String
    name: String
    domain: Domain
    description: String
    defaultPrice: Float
    currency: String
    operationGuideType: String
    operationGuide: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
