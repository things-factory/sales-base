import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const goodsReceivalNoteResolver = {
  async goodsReceivalNote(_: any, { name }, context: any) {
    return await getRepository(GoodsReceivalNote).findOne({
      where: {
        domain: context.state.domain,
        name
      },
      relations: ['domain', 'bizplace', 'bizplace.company', 'arrivalNotice', 'creator', 'updater']
    })
  }
}
