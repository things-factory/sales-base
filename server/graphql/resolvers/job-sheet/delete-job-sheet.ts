import { getRepository } from 'typeorm'
import { JobSheet } from '../../../entities'

export const deleteJobSheet = {
  async deleteJobSheet(_, { id }) {
    const repository = getRepository(JobSheet)

    return await repository.delete(id)
  }
}
