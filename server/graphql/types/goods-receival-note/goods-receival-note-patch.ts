import gql from 'graphql-tag'

export const GoodsReceivalNotePatch = gql`
  input GoodsReceivalNotePatch {
    id: String
    name: String
    description: String
    customerStatus: String
    status: String
    refNo: String
    arrivalNotice: ObjectRef
  }
`
