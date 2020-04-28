import gql from 'graphql-tag'

export const NewInventoryCheck = gql`
  input NewInventoryCheck {
    name: String!
    description: String
    status: String
    executionDate: String
    orderInventories: [NewOrderInventory]
    type: String
  }
`
