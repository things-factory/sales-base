import { getRepository } from 'typeorm'
import { JobSheet } from '../../../entities'

export const updateJobSheet = {
  async updateJobSheet(_, { id, patch }) {
    const repository = getRepository(JobSheet)

    const jobSheet = await repository.findOne({ id })

    return await repository.save({
      ...jobSheet,
      ...patch
    })
  }
}
