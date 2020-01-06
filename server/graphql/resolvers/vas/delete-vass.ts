import { getRepository, In } from 'typeorm'
import { Vas } from '../../../entities'

export const deleteVass = {
  async deleteVass(_: any, { ids }, context: any) {
    await getRepository(Vas).delete(ids)
  }
}
