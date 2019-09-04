import { getRepository, In } from 'typeorm'
import { Vas } from '../../../entities'

export const deleteVass = {
  async deleteVass(_: any, { names }, context: any) {
    await getRepository(Vas).delete({
      name: In(names),
      domain: context.state.domain
    })
    return true
  }
}
