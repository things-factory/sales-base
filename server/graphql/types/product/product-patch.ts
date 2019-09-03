import { gql } from 'apollo-server-koa'

export const ProductPatch = gql`
  input ProductPatch {
    id: String
    bizplace: ObjectRef
    name: String
    description: String
    productOptions: [ObjectRef]
    batches: [ObjectRef]
    type: String
    cuFlag: String
  }
`
