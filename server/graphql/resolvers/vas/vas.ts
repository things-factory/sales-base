import { getUserBizplaces } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { Vas } from '../../../entities'

export const vasResolver = {
  async vas(_: any, { name }, context: any) {
    return await getRepository(Vas).findOne({
      where: { domain: context.state.domain, name, bizplace: In(await getUserBizplaces(context)) },
      relations: ['domain', 'bizplace', 'creator', 'updater']
    })
  }
}
