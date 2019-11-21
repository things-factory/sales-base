import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { getMyBizplace } from '@things-factory/biz-base'

export const customerReceivalNotesResolver = {
  async customerReceivalNotes(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(GoodsReceivalNote).findAndCount({
      ...convertedParams,
      where: {
        domain: context.state.domain,
        bizplace: await getMyBizplace(context.state.user)
      },
      relations: ['domain', 'arrivalNotice', 'bizplace', 'creator', 'updater']
    })
    return { items, total }
  }
}
