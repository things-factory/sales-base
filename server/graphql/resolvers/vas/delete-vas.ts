import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'

export const deleteVas = {
  async deleteVas(_: any, { name }) {
    await getRepository(Vas).delete(name)
    return true
  }
}
