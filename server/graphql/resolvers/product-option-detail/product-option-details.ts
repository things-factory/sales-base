import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const productOptionDetailsResolver = {
  async productOptionDetails(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(ProductOptionDetail).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('ProductOptionDetail.domain', 'Domain')
      .leftJoinAndSelect('ProductOptionDetail.productOption', 'ProductOption')
      .leftJoinAndSelect('ProductOptionDetail.creator', 'Creator')
      .leftJoinAndSelect('ProductOptionDetail.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
