import { Bizplace } from '@things-factory/biz-base'
import { Attachment } from '@things-factory/attachment-base'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrderResolver = {
  async deliveryOrder(_: any, { name }, context: any) {
    const foundDO = await getRepository(DeliveryOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: [
        'domain',
        'bizplace',
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
        refBy: foundDO.id
      }
    })

    return { ...foundDO, attachments: foundAttachments }
  }
}
