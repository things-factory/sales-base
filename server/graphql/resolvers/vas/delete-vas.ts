import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'

export const deleteVas = {
  async deleteVas(_: any, { name }, context: any) {
    await getRepository(Vas).delete({
      name,
      domain: context.state.domain
    })
    return true
  }
}
