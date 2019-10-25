import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Claim } from '../../../entities'

export const claimsResolver = {
  async claims(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    let [items, total] = await getRepository(Claim).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater', 'bizplace', 'transportVehicle', 'transportDriver', 'claimDetails']
    })

    return { items, total }
  }
}
