import { getRepository } from 'typeorm'
import { ArrivalNoticeProduct } from '../../../entities'

export const updateArrivalNoticeProduct = {
  async updateArrivalNoticeProduct(_: any, { name, patch }, context: any) {
    const arrivalNoticeProduct = await getRepository(ArrivalNoticeProduct).findOne({
      where: { domain: context.state.domain, name }
    })

    return await getRepository(ArrivalNoticeProduct).save({
      ...arrivalNoticeProduct,
      ...patch,
      updater: context.state.user
    })
  }
}
