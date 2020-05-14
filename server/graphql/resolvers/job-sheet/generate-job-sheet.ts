import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { JobSheet, ArrivalNotice } from '../../../entities'

export const generateJobSheetResolver = {
  async generateJobSheet(_: any, { containerInfo, arrivalNoticeNo }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await generateJobSheet(containerInfo, context.state.domain, context.state.user, trxMgr)
    })
  }
}

export async function generateJobSheet(
  containerInfo: any,
  domain: Domain,
  user: User,
  trxMgr?: EntityManager
): Promise<JobSheet> {
  const jobSheetRepo: Repository<JobSheet> = trxMgr ? trxMgr.getRepository(JobSheet) : getRepository(JobSheet)
  const arrivalNoticeRepo: Repository<ArrivalNotice> = trxMgr
    ? trxMgr.getRepository(ArrivalNotice)
    : getRepository(ArrivalNotice)

  return jobSheet
}
