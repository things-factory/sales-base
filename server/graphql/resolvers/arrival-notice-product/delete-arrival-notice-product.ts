import { getRepository } from 'typeorm'
import { ArrivalNoticeProduct } from '../../../entities'

export const deleteArrivalNoticeProduct = {
  async deleteArrivalNoticeProduct(_: any, { name }, context: any) {
    await getRepository(ArrivalNoticeProduct).delete({ domain: context.state.domain, name })
    return true
  }
}

