import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { OrderInventory, ReleaseGood } from '../../../entities'
import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository, Like, SelectQueryBuilder } from 'typeorm'
import { releaseGoodDetailResolver } from '../release-good/release-good-detail'

export const inventoriesByOrderResolver = {
  async inventoriesByOrder(_: any, params: ListParam, context: any) {
    let permittedBizplaceIds: string[] = await getPermittedBizplaceIds(context.state.domain, context.state.user)

    if (!params.filters.find((filter: any) => filter.name === 'bizplace')) {
      params.filters.push({
        name: 'bizplace',
        operator: 'in',
        value: permittedBizplaceIds,
        relation: true
      })
    } else {
      permittedBizplaceIds = params.filters.find(filter => filter.name === 'bizplace').value
      params.filters.find(filter => filter.name === 'bizplace').relation = true
    }

    if (params.filters.find((filter: any) => filter.name === 'releaseGoodName')) {
      let releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
        where: {
          name: Like(params.filters.find(filter => filter.name === 'releaseGoodName').value)
        }
      })

      params.filters = params.filters.filter(filter => filter.name != 'releaseGoodName')

      params.filters.push({
        name: 'releaseGoodId',
        operator: 'eq',
        value: releaseGood.id,
        relation: true
      })
    }

    const qb: SelectQueryBuilder<OrderInventory> = getRepository(OrderInventory).createQueryBuilder('oi')
    buildQuery(qb, params, context)

    qb.leftJoinAndSelect('oi.domain', 'domain')
      .leftJoinAndSelect('oi.bizplace', 'bizplace')
      .leftJoinAndSelect('oi.product', 'product')
      .leftJoinAndSelect('oi.inventory', 'inventory')
      .leftJoinAndSelect('oi.releaseGood', 'releaseGood')
      .leftJoinAndSelect('oi.creator', 'creator')
      .leftJoinAndSelect('oi.updater', 'updater')

    let [items, total] = await qb.getManyAndCount()

    items = items.map((item: OrderInventory) => {
      return {
        ...item,
        id: item.inventory.id,
        releaseGoodName: item.releaseGood.name,
        productId: item.product.id,
        productName: item.product.name
      }
    })

    return { items, total }
  }
}
