import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { GRN_STATUS } from '../../../constants'

export const submittedGoodsReceivalNote = {
  async submittedGoodsReceivalNote(_: any, { name }, context: any) {
    const repository = getRepository(GoodsReceivalNote)
    const goodsReceivalNote = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...goodsReceivalNote,
      status: GRN_STATUS.SUBMITTED,
      updater: context.state.user
    })
  }
}
