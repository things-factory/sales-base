import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ArrivalNoticeVas } from '../../../entities'

export const arrivalNoticeVasResolver = {
  async arrivalNoticeVas(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(ArrivalNoticeVas).findAndCount({
      ...convertedParams,
      relations: ['domain', 'arrivalNotice', 'vas', 'creator', 'updater']
    })
    return { items, total }
  }
}
