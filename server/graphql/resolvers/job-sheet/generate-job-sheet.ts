import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { JobSheet } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateJobSheetResolver = {
  async generateJobSheet(_: any, { myBizplace, containerInfo }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await generateJobSheet(context.state.domain, context.state.user, myBizplace, containerInfo, trxMgr)
    })
  }
}

export async function generateJobSheet(
  domain: Domain,
  user: User,
  myBizplace: Bizplace,
  containerInfo: any,
  trxMgr?: EntityManager
): Promise<JobSheet> {
  const jobSheetRepo: Repository<JobSheet> = trxMgr?.getRepository(JobSheet) || getRepository(JobSheet)

  // 1. Create job sheet
  const createdJobSheet: JobSheet = await jobSheetRepo.save({
    name: OrderNoGenerator.jobSheet(domain.name),
    domain,
    bizplace: myBizplace,
    adviseMtDate: containerInfo.mtDate,
    containerSize: containerInfo.containerSize,
    creator: user,
    updater: user
  })

  return createdJobSheet
}
