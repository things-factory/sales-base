import { Attachment } from '@things-factory/attachment-base'
import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrderResolver = {
  async deliveryOrder(_: any, { name }, context: any) {
    const foundDO = await getRepository(DeliveryOrder).findOne({
      where: {
        domain: context.state.domain,
        name
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
