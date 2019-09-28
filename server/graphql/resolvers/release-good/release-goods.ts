import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ReleaseGood } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const releaseGoodsResolver = {
  async releaseGoods(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(ReleaseGood).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'bizplace',
        'shippingOrder',
        'deliveryOrder',
        'orderInventory',
        'orderVass',
        'creator',
        'updater'
      ]
    })
    return { items, total }
  }
}
