import { getRepository } from 'typeorm'
import { VasOrder } from '../../../entities'

export const deleteVasOrder = {
  async deleteVasOrder(_: any, { name }, context: any) {
    await getRepository(VasOrder).delete({ domain: context.state.domain, name })
    return true
  }
}

