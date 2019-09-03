import { gql } from 'apollo-server-koa'

export const ProductPatch = gql`
  input ProductPatch {
    id: String
    bizplace: ObjectRef
    name: String
    yourName: String
    description: String
    options: [ObjectRef]
    batches: [ObjectRef]
    type: String
    cuFlag: String
  }
`
