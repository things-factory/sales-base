import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'

export const vassResolver = {
  async vass(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params, context.state.domain.id)

    const [items, total] = await getRepository(Vas).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })

    return { items, total }
  }
}
