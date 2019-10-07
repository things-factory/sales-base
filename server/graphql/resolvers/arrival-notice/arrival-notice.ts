import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { ArrivalNotice } from '../../../entities'
import { Attachment } from '@things-factory/attachment-base'

export const arrivalNoticeResolver = {
  async arrivalNotice(_: any, { name }, context: any) {
    const arrivalNotice: any = await getRepository(ArrivalNotice).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: [
        'domain',
        'bizplace',
        'orderProducts',
        'orderProducts.product',
        'orderVass',
        'orderVass.vas',
        'collectionOrder',
        'creator',
        'updater'
      ]
    })

    let attachment: Attachment
    if (arrivalNotice.collectionOrder) {
      attachment = await getRepository(Attachment).findOne({
        where: { domain: context.state.domain, refBy: arrivalNotice.collectionOrder.id }
      })
    }

    return {
      ...arrivalNotice,
      attachment
    }
  }
}
