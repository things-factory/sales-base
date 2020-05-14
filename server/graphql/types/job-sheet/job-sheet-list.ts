import gql from 'graphql-tag'

export const JobSheetList = gql`
  type JobSheetList {
    items: [JobSheet]
    total: Int
  }
`
