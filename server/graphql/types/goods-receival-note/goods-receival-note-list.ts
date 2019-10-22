import { gql } from 'apollo-server-koa'

export const GoodsReceivalNoteList = gql`
  type GoodsReceivalNoteList {
    items: [GoodsReceivalNote]
    total: Int
  }
`
