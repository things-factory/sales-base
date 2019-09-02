import { gql } from 'apollo-server-koa'

export const ProductPatch = gql`
  input ProductPatch {
    id: String
    bizplace: ObjectRef
    name: String
    yourName: String
    description: String
    refTo: ObjectRef
    aliases: [ObjectRef]
    options: [ObjectRef]
    batches: [ObjectRef]
    type: String
    weight: String
    unit: String
    cuFlag: String
  }
`
