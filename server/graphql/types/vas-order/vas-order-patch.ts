import gql from 'graphql-tag'

export const VasOrderPatch = gql`
  input VasOrderPatch {
    name: String
    description: String
    orderVass: [ObjectRef]
    status: String
    remark: String
  }
`
