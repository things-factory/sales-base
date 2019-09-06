import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const updateArrivalNotice = {
  async updateArrivalNotice(_: any, { name, patch }, context: any) {
    const arrivalNotice = await getRepository(ArrivalNotice).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      }
    })

    return await getRepository(ArrivalNotice).save({
      ...arrivalNotice,
      ...patch,
      updater: context.state.user
    })
  }
}
