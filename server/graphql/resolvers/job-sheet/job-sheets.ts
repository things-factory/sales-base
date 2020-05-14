import { getRepository } from 'typeorm'
import { JobSheet } from '../../../entities'

export const jobSheetsResolver = {
  async jobSheets() {
    const repository = getRepository(JobSheet)

    return await repository.find()
  }
}
