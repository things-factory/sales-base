import { getRepository, In } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const deleteGoodsReceivalNotes = {
  async deleteGoodsReceivalNotes(_: any, { names }, context: any) {
    await getRepository(GoodsReceivalNote).delete({
      domain: context.state.domain,
      name: In(names)
    })
    return true
  }
}
