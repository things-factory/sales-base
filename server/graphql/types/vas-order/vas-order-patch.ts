import { gql } from 'apollo-server-koa'

export const VasOrderPatch = gql`
  input VasOrderPatch {
    name: String
    description: String
    orderVass: [ObjectRef]
    status: String
    remark: String
  }
`
