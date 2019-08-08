import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const productOptionsResolver = {
  async productOptions(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(ProductOption).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('ProductOption.domain', 'Domain')
      .leftJoinAndSelect('ProductOption.product', 'Product')
      .leftJoinAndSelect('ProductOption.details', 'Details')
      .leftJoinAndSelect('ProductOption.creator', 'Creator')
      .leftJoinAndSelect('ProductOption.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
