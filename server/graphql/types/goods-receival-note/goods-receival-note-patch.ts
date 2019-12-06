import { gql } from 'apollo-server-koa'

export const GoodsReceivalNotePatch = gql`
  input GoodsReceivalNotePatch {
    id: String
    name: String
    description: String
    status: String
    refNo: String
    arrivalNotice: ObjectRef
  }
`
