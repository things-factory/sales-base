import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticeResolver = {
  async arrivalNotice(_: any, { name }, context: any) {
    return await getRepository(ArrivalNotice).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user)),
      },
      relations: [
        'domain',
        'bizplace',
        'orderProducts',
        'orderProducts.product',
        'orderVass',
        'orderVass.vas',
        'orderVass.targetProduct',
        'creator',
        'updater',
      ],
    })
  },
}
