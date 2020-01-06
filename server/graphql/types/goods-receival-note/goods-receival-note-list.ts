import gql from 'graphql-tag'

export const GoodsReceivalNoteList = gql`
  type GoodsReceivalNoteList {
    items: [GoodsReceivalNote]
    total: Int
  }
`
