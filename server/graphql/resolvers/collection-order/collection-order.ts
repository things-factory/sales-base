import { Attachment } from '@things-factory/attachment-base'
import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const collectionOrderResolver = {
  async collectionOrder(_: any, { name }, context: any) {
    const foundCO = await getRepository(CollectionOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      },
      relations: [
        'domain',
        'bizplace',
        'arrivalNotice',
        'transportOrderDetails',
        'transportOrderDetails.transportDriver',
        'transportOrderDetails.transportVehicle',
        'creator',
        'updater'
      ]
    })

    const foundAttachments = await getRepository(Attachment).find({
      where: {
        domain: context.state.domain,
        refBy: foundCO.id
      }
    })

    return { ...foundCO, attachments: foundAttachments }
  }
}
