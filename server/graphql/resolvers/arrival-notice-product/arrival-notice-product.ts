import { getRepository } from 'typeorm'
import { ArrivalNoticeProduct } from '../../../entities'

export const arrivalNoticeProductResolver = {
  async arrivalNoticeProduct(_: any, { name }, context: any) {
    return await getRepository(ArrivalNoticeProduct).findOne({
      where: {
        domain: context.state.domain,
        name,
        relations: ['domain', 'arrivalNotice', 'product', 'creator', 'updater']
      }
    })
  }
}
