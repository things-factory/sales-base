import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const quotationPromotionsResolver = {
  async quotationPromotions(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(QuotationPromotion).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('QuotationPromotion.domain', 'Domain')
      .leftJoinAndSelect('QuotationPromotion.creator', 'Creator')
      .leftJoinAndSelect('QuotationPromotion.updater', 'Updater')
      .getManyAndCount()
    return { items, total }
  }
}
