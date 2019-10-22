import { goodsReceivalNoteResolver } from './goods-receival-note'
import { goodsReceivalNotesResolver } from './goods-receival-notes'

import { updateGoodsReceivalNote } from './update-goods-receival-note'
import { createGoodsReceivalNote } from './create-goods-receival-note'
import { deleteGoodsReceivalNote } from './delete-goods-receival-note'
import { deleteGoodsReceivalNotes } from './delete-goods-receival-notes'
import { generateGoodsReceivalNote } from './generate-goods-receival-note'

export const Query = {
  ...goodsReceivalNotesResolver,
  ...goodsReceivalNoteResolver
}

export const Mutation = {
  ...updateGoodsReceivalNote,
  ...createGoodsReceivalNote,
  ...deleteGoodsReceivalNote,
  ...deleteGoodsReceivalNotes,
  ...generateGoodsReceivalNote
}
