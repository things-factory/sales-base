import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const quotationPromotionsResolver = {
  async quotationPromotions(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(QuotationPromotion).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()
    return { items, total }
  }
}
