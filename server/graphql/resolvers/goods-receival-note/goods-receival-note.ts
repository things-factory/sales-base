import { getRepository, In } from 'typeorm'
import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const goodsReceivalNoteResolver = {
  async goodsReceivalNote(_: any, { name }, context: any) {
    return await getRepository(GoodsReceivalNote).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      },
      relations: ['domain', 'bizplace', 'bizplace.company', 'arrivalNotice', 'creator', 'updater']
    })
  }
}
