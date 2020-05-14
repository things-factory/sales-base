import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { JobSheet } from '../../../entities'

export const jobSheetResolver = {
  async arrivalNotice(_: any, { name }, context: any) {
    return await getRepository(JobSheet).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      },
      relations: ['domain', 'bizplace', 'creator', 'updater']
    })
  }
}
