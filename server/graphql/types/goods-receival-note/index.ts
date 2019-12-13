import { GoodsReceivalNote } from './goods-receival-note'
import { NewGoodsReceivalNote } from './new-goods-receival-note'
import { GoodsReceivalNotePatch } from './goods-receival-note-patch'
import { GoodsReceivalNoteList } from './goods-receival-note-list'

export const Mutation = `
  createGoodsReceivalNote (
    goodsReceivalNote: NewGoodsReceivalNote!
  ): GoodsReceivalNote

  updateGoodsReceivalNote (
    name: String!
    patch: GoodsReceivalNotePatch!
  ): GoodsReceivalNote

  generateGoodsReceivalNote (
    grn: NewGoodsReceivalNote
  ): GoodsReceivalNote

  deleteGoodsReceivalNote (
    name: String!
  ): Boolean

  deleteGoodsReceivalNotes (
    names: [String]!
  ): Boolean

  submitGoodsReceivalNote (
    name: String!
    file: Upload
  ): GoodsReceivalNote

  receivedGoodsReceivalNote (
    name: String!
  ): GoodsReceivalNote
`

export const Query = `
  goodsReceivalNotes(filters: [Filter], pagination: Pagination, sortings: [Sorting]): GoodsReceivalNoteList
  customerReceivalNotes(filters: [Filter], pagination: Pagination, sortings: [Sorting]): GoodsReceivalNoteList
  goodsReceivalNote(name: String!): GoodsReceivalNote

`

export const Types = [GoodsReceivalNote, NewGoodsReceivalNote, GoodsReceivalNotePatch, GoodsReceivalNoteList]
