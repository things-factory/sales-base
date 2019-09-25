import { getRepository, In } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const deleteReleaseGoods = {
  async deleteReleaseGoods(_: any, { names }, context: any) {
    await getRepository(ReleaseGood).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

