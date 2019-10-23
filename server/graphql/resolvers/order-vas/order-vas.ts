import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { OrderVas } from '../../../entities'

export const orderVasResolver = {
  async orderVas(_: any, { name }, context: any) {
    return await getRepository(OrderVas).findOne({
      where: {
        domain: context.state.domain,
        name
      },
      relations: [
        'domain',
        'arrivalNotice',
        'releaseGood',
        'vasOrder',
        'shippingOrder',
        'vas',
        'inventory',
        'creator',
        'updater'
      ]
    })
  }
}
