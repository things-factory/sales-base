import { getRepository, In } from 'typeorm'
import { ArrivalNotice } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const arrivalNoticeResolver = {
  async arrivalNotice(_: any, { name }, context: any) {
    return await getRepository(ArrivalNotice).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: ['domain', 'bizplace', 'collectionOrder', 'deliveryOrder', 'creator', 'updater']
    })
  }
}
