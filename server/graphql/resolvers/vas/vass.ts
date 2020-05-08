import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository, SelectQueryBuilder } from 'typeorm'
import { Vas } from '../../../entities'

export const vassResolver = {
  async vass(_: any, params: ListParam, context: any) {
    const qb: SelectQueryBuilder<Vas> = getRepository(Vas).createQueryBuilder()
    buildQuery(qb, params, context)

    const [items, total] = await qb
      .leftJoinAndSelect('Vas.domain', 'Domain')
      .leftJoinAndSelect('Vas.creator', 'Creator')
      .leftJoinAndSelect('Vas.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
