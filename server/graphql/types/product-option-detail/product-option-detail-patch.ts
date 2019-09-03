import { gql } from 'apollo-server-koa'

export const ProductOptionDetailPatch = gql`
  input ProductOptionDetailPatch {
    id: String
    name: String
    productOption: ObjectRef
    description: String
    cuFlag: String
  }
`
