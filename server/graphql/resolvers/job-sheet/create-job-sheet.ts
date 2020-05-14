import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { JobSheet } from '../../../entities'

export const createJobSheet = {
  async createJobSheet(_, { jobSheet: attrs }) {
    const repository = getRepository(JobSheet)
    const newJobSheet = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newJobSheet)
  }
}
