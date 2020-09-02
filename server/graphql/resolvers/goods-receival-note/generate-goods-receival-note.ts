import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { GRN_STATUS } from '../../../constants'
import { ArrivalNotice } from '../../../entities/arrival-notice'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { generateId } from '@things-factory/id-rule-base'

export const generateGoodsReceivalNoteResolver = {
  async generateGoodsReceivalNote(_: any, { grn }, context: any) {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      return await generateGoodsReceivalNote(grn, context.state.domain, context.state.user, trxMgr)
    })
  }
}

export async function generateGoodsReceivalNote(
  grn: { refNo: string; customer: string },
  domain: Domain,
  user: User,
  trxMgr?: EntityManager
): Promise<GoodsReceivalNote> {
  // 1. Create grn
  const grnRepo: Repository<GoodsReceivalNote> =
    trxMgr?.getRepository(GoodsReceivalNote) || getRepository(GoodsReceivalNote)
  const bizplaceRepo: Repository<Bizplace> = trxMgr?.getRepository(Bizplace) || getRepository(Bizplace)
  const ganRepo: Repository<ArrivalNotice> = trxMgr?.getRepository(ArrivalNotice) || getRepository(ArrivalNotice)

  const bizplace: Bizplace = await bizplaceRepo.findOne({ where: { id: grn.customer } })
  const arrivalNotice: ArrivalNotice = await ganRepo.findOne({ where: { domain, name: grn.refNo } })
  const orderNo: string = await generateId({ domain, type: 'grn_number', seed: {} })

  return await grnRepo.save({
    ...grn,
    name: orderNo,
    domain,
    bizplace,
    arrivalNotice,
    status: GRN_STATUS.PENDING_PROCESS,
    creator: user,
    updater: user
  })
}
