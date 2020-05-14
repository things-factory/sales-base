import { getRepository } from 'typeorm'
import { JobSheet } from '../../../entities'

export const jobSheetResolver = {
  async jobSheet(_, { id }, context, info) {
    const repository = getRepository(JobSheet)

    return await repository.findOne(
      { id },
      {
        relations: ['jobSheetDetails']
      }
    )
  }
}
