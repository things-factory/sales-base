import { gql } from 'apollo-server-koa'

export const NewProduct = gql`
  input NewProduct {
    bizplace: ObjectRef!
    name: String!
    yourName: String
    description: String
    refTo: ObjectRef
    aliases: [ObjectRef]
    options: [ObjectRef]
    batches: [ObjectRef]
    type: String
    weight: String
    unit: String
  }
`
