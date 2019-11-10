import gql from 'graphql-tag'

export const InvoiceList = gql`
  type InvoiceList {
    items: [Invoice]
    total: Int
  }
`
