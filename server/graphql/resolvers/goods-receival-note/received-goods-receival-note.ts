import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { GRN_STATUS } from '../../../constants'

export const receivedGoodsReceivalNote = {
  async receivedGoodsReceivalNote(_: any, { name }, context: any) {
    const goodsReceivalNote = await getRepository(GoodsReceivalNote).findOne({
      where: { domain: context.state.domain, name }
    })

    return await getRepository(GoodsReceivalNote).save({
      ...goodsReceivalNote,
      status: GRN_STATUS.RECEIVED,
      customerStatus: GRN_STATUS.RECEIVED,
      updater: context.state.user
    })
  }
}
