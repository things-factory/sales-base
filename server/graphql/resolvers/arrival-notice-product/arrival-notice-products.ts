import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ArrivalNoticeProduct } from '../../../entities'

export const arrivalNoticeProductsResolver = {
  async arrivalNoticeProducts(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(ArrivalNoticeProduct).findAndCount({
      ...convertedParams,
      relations: ['domain', 'arrivalNotice', 'product', 'creator', 'updater']
    })
    return { items, total }
  }
}
