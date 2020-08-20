import { Attachment } from '@things-factory/attachment-base'
import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { ATTACHMENT_TYPE } from '../../../constants/attachment-type'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticeResolver = {
  async arrivalNotice(_: any, { name }, context: any) {
    const foundGAN: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      },
      relations: [
        'domain',
        'bizplace',
        'jobSheet',
        'releaseGood',
        'orderProducts',
        'orderProducts.product',
        'orderVass',
        'orderVass.vas',
        'orderVass.targetProduct',
        'creator',
        'updater'
      ]
    })

    if (!foundGAN?.id) throw new Error(`Failed to find arrival notice with ${name}`)

    const foundAttachments: Attachment[] = await getRepository(Attachment).find({
      where: {
        domain: context.state.domain,
        refBy: foundGAN.id,
        category: ATTACHMENT_TYPE.GAN
      }
    })

    return {
      ...foundGAN,
      attachment: foundAttachments
    }
  }
}
