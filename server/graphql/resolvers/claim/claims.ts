import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Claim } from '../../../entities'

export const claimsResolver = {
  async claims(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(Claim).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}