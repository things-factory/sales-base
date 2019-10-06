import { Bizplace } from '@things-factory/biz-base'
import { Attachment } from '@things-factory/attachment-base'
import { getRepository, In } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const collectionOrderResolver = {
  async collectionOrder(_: any, { name }, context: any) {
    const foundCO = await getRepository(CollectionOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: ['domain', 'bizplace', 'transportDriver', 'transportVehicle', 'creator', 'updater']
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
