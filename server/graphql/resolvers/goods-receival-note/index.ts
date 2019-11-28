import { goodsReceivalNoteResolver } from './goods-receival-note'
import { goodsReceivalNotesResolver } from './goods-receival-notes'
import { customerReceivalNotesResolver } from './customer-receival-notes'

import { updateGoodsReceivalNote } from './update-goods-receival-note'
import { createGoodsReceivalNote } from './create-goods-receival-note'
import { deleteGoodsReceivalNote } from './delete-goods-receival-note'
import { deleteGoodsReceivalNotes } from './delete-goods-receival-notes'
import { generateGoodsReceivalNoteResolver } from './generate-goods-receival-note'

export const Query = {
  ...goodsReceivalNotesResolver,
  ...goodsReceivalNoteResolver,
  ...customerReceivalNotesResolver
}

export const Mutation = {
  ...updateGoodsReceivalNote,
  ...createGoodsReceivalNote,
  ...deleteGoodsReceivalNote,
  ...deleteGoodsReceivalNotes,
  ...generateGoodsReceivalNoteResolver
}
