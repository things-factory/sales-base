import { getRepository, In } from 'typeorm'
import { ReleaseGood } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const releaseGoodResolver = {
  async releaseGood(_: any, { name }, context: any) {
    return await getRepository(ReleaseGood).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: [
        'domain',
        'bizplace',
        'orderInventories',
        'orderInventories.inventory',
        'orderVass',
        'orderVass.vas',
        'deliveryOrder',
        'creator',
        'updater'
      ]
    })
  }
}
