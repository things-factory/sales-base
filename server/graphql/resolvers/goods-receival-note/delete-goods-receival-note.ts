import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const deleteGoodsReceivalNote = {
  async deleteGoodsReceivalNote(_: any, { name }, context: any) {
    await getRepository(GoodsReceivalNote).delete({ domain: context.state.domain, name })
    return true
  }
}
