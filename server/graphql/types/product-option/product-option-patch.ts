import { gql } from 'apollo-server-koa'

export const ProductOptionPatch = gql`
  input ProductOptionPatch {
    id: String
    name: String
    product: ObjectRef
    productOptionDetails: [ObjectRef]
    description: String
    cuFlag: String
  }
`
