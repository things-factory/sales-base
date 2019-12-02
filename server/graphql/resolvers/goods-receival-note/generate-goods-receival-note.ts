import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice } from '../../../entities/arrival-notice'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateGoodsReceivalNoteResolver = {
  async generateGoodsReceivalNote(_: any, { grn }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await generateGoodsReceivalNote(grn, context.state.domain, context.state.user)
    })
  }
}

export async function generateGoodsReceivalNote(grn: any, domain: Domain, user: User): Promise<GoodsReceivalNote> {
  // 1. Create grn
  return await getRepository(GoodsReceivalNote).save({
    ...grn,
    name: OrderNoGenerator.goodsReceiveNote(),
    domain,
    bizplace: await getRepository(Bizplace).findOne({
      where: { domain, id: grn.customer }
    }),
    arrivalNotice: await getRepository(ArrivalNotice).findOne({
      where: { domain, name: grn.refNo }
    }),
    creator: user,
    updater: user
  })
}
