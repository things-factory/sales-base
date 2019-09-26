import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ClaimDetail } from '../../../entities'

export const claimDetailsResolver = {
  async claimDetails(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(ClaimDetail).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}