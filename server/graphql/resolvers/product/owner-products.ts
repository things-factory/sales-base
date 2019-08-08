import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const ownerProductsResolver = {
  async ownerProducts(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Product).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('Product.bizplace', 'Bizplace')
      .leftJoinAndSelect('Product.productBatch', 'ProductBatch')
      .leftJoinAndSelect('Product.refTo', 'RefTo')
      .leftJoinAndSelect('Product.aliases', 'Aliases')
      .leftJoinAndSelect('Product.options', 'Options')
      .leftJoinAndSelect('Product.creator', 'Creator')
      .leftJoinAndSelect('Product.updater', 'Updater')
      .where('Product.type like :type', { type: '%service%' })
      .getManyAndCount()

    return { items, total }
  }
}
