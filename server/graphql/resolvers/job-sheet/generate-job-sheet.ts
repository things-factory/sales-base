import { User } from '@things-factory/auth-base'
import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { JobSheet } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateJobSheetResolver = {
  async generateJobSheet(_: any, { containerInfo }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await generateJobSheet(context.state.domain, context.state.user, containerInfo, trxMgr)
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

  const myBizplace: Bizplace = await getMyBizplace(user)

  // 1. Create job sheet
  const createdJobSheet: JobSheet = await jobSheetRepo.save({
    name: OrderNoGenerator.jobSheet(domain.name),
    domain,
    bizplace: myBizplace,
    adviseMtDate: containerInfo.containerMtDate,
    containerSize: containerInfo.containerSize,
    creator: user,
    updater: user
  })

  return createdJobSheet
}
