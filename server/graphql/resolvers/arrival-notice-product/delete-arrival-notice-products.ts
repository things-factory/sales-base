import { getRepository, In } from 'typeorm'
import { ArrivalNoticeProduct } from '../../../entities'

export const deleteArrivalNoticeProducts = {
  async deleteArrivalNoticeProducts(_: any, { names }, context: any) {
    await getRepository(ArrivalNoticeProduct).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

