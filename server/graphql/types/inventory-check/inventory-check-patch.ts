import gql from 'graphql-tag'

export const InventoryCheckPatch = gql`
  input InventoryCheckPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
