import { getManager } from 'typeorm'
import { JobSheet } from '../../../entities'

export const updateJobSheet = {
  async updateJobSheet(_, { name, patch }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const jobSheet = await trxMgr.getRepository(JobSheet).findOne({
        where: {
          domain: context.state.domain,
          name
        }
      })

      return await trxMgr.getRepository(JobSheet).save({
        ...jobSheet,
        ...patch
      })
    })
  }
}
