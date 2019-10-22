import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const updateGoodsReceivalNote = {
  async updateGoodsReceivalNote(_: any, { name, patch }, context: any) {
    const repository = getRepository(GoodsReceivalNote)
    const goodsReceivalNote = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...goodsReceivalNote,
      ...patch,
      updater: context.state.user
    })
  }
}
