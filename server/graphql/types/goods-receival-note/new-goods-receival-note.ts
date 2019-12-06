import { gql } from 'apollo-server-koa'

export const NewGoodsReceivalNote = gql`
  input NewGoodsReceivalNote {
    name: String
    description: String
    status: String
    refNo: String
    customer: String
    arrivalNotice: ObjectRef
  }
`
