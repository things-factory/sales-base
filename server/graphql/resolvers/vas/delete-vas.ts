import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'

export const deleteVas = {
  async deleteVas(_: any, { id }, _context: any) {
    await getRepository(Vas).delete(id)
  }
}
