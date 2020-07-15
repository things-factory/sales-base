import { getManager } from 'typeorm'
import { JobSheet, ArrivalNotice } from '../../../entities'

export const updateJobSheet = {
  async updateJobSheet(_, { name, patch }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const jobSheet = await trxMgr.getRepository(JobSheet).findOne({
        where: {
          domain: context.state.domain,
          name
        }
      })

      const foundGAN: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: {
          domain: context.state.domain,
          jobSheet
        }
      })

      await trxMgr.getRepository(ArrivalNotice).save({
        ...foundGAN,
        ata: patch.ata,
        updater: context.state.user
      })

      return await trxMgr.getRepository(JobSheet).save({
        ...jobSheet,
        ...patch
      })
    })
  }
}
