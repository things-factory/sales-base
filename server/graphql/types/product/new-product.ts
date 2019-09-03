import { gql } from 'apollo-server-koa'

export const NewProduct = gql`
  input NewProduct {
    bizplace: ObjectRef!
    name: String!
    yourName: String
    description: String
    options: [ObjectRef]
    batches: [ObjectRef]
    type: String
  }
`
