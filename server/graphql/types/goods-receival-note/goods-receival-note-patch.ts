import gql from 'graphql-tag'

export const GoodsReceivalNotePatch = gql`
  input GoodsReceivalNotePatch {
    id: String
    name: String
    description: String
    refNo: String
    arrivalNotice: ObjectRef
  }
`
