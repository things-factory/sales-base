import { gql } from 'apollo-server-koa'

export const NewProductOption = gql`
  input NewProductOption {
    name: String!
    description: String
    product: ObjectRef!
    productOptionDetails: [ObjectRef]
  }
`
