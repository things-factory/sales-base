import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const createGoodsReceivalNote = {
  async createGoodsReceivalNote(_: any, { goodsReceivalNote }, context: any) {
    return await getRepository(GoodsReceivalNote).save({
      ...goodsReceivalNote,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
