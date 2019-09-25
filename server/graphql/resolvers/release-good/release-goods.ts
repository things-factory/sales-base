import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const releaseGoodsResolver = {
  async releaseGoods(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(ReleaseGood).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}