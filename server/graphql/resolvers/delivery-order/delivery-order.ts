import { Attachment } from '@things-factory/attachment-base'
import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrderResolver = {
  async deliveryOrder(_: any, { name }, context: any) {
    const foundDO = await getRepository(DeliveryOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      },
      relations: ['domain', 'bizplace', 'transportDriver', 'transportVehicle', 'releaseGood', 'creator', 'updater']
    })
    const foundAttachments = await getRepository(Attachment).find({
      where: {
        domain: context.state.domain,
        refBy: foundDO.id
      }
    })

    return { ...foundDO, attachments: foundAttachments }
  }
}
