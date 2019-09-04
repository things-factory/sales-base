import { getRepository, In } from 'typeorm'
import { ArrivalNoticeVas } from '../../../entities'

export const deleteArrivalNoticeVass = {
  async deleteArrivalNoticeVass(_: any, { names }, context: any) {
    await getRepository(ArrivalNoticeVas).delete({
      domain: context.state.domain,
      name: In(names)
    })
    return true
  }
}
