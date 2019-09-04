import { getRepository } from 'typeorm'
import { ArrivalNoticeVas } from '../../../entities'

export const updateArrivalNoticeVas = {
  async updateArrivalNoticeVas(_: any, { name, patch }, context: any) {
    const arrivalNoticeVas = await getRepository(ArrivalNoticeVas).findOne({
      where: { domain: context.state.domain, name }
    })

    return await getRepository(ArrivalNoticeVas).save({
      ...arrivalNoticeVas,
      ...patch,
      updater: context.state.user
    })
  }
}
