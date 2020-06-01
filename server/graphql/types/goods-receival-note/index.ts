import { GoodsReceivalNote } from './goods-receival-note'
import { NewGoodsReceivalNote } from './new-goods-receival-note'
import { GoodsReceivalNotePatch } from './goods-receival-note-patch'
import { GoodsReceivalNoteList } from './goods-receival-note-list'

export const Mutation = `
  createGoodsReceivalNote (
    goodsReceivalNote: NewGoodsReceivalNote!
  ): GoodsReceivalNote @priviledge(category: "order", priviledge: "mutation")

  updateGoodsReceivalNote (
    name: String!
    patch: GoodsReceivalNotePatch!
  ): GoodsReceivalNote @priviledge(category: "order", priviledge: "mutation")

  generateGoodsReceivalNote (
    grn: NewGoodsReceivalNote
  ): GoodsReceivalNote @priviledge(category: "order_warehouse", priviledge: "mutation")

  deleteGoodsReceivalNote (
    name: String!
  ): Boolean @priviledge(category: "order_warehouse", priviledge: "mutation")

  deleteGoodsReceivalNotes (
    names: [String]!
  ): Boolean @priviledge(category: "order_warehouse", priviledge: "mutation")

  receivedGoodsReceivalNote (
    name: String!
  ): GoodsReceivalNote
`

export const Query = `
  goodsReceivalNotes (
    filters: [Filter], pagination: Pagination, sortings: [Sorting]
  ): GoodsReceivalNoteList

  goodsReceivalNote(
    name: String!
  ): GoodsReceivalNote

`

export const Types = [GoodsReceivalNote, NewGoodsReceivalNote, GoodsReceivalNotePatch, GoodsReceivalNoteList]
