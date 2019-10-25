import { getManager } from 'typeorm'
import { OrderNoGenerator } from '../../../utils/order-no-generator'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { ArrivalNotice } from '../../../entities/arrival-notice'
import { Bizplace } from '@things-factory/biz-base'

export const generateGoodsReceivalNote = {
  async generateGoodsReceivalNote(_: any, { grn }, context: any) {
    return await getManager().transaction(async trxMgr => {
      // 1. Create grn
      const createdGrn: GoodsReceivalNote = await trxMgr.getRepository(GoodsReceivalNote).save({
        ...grn,
        name: OrderNoGenerator.goodsReceiveNote(),
        domain: context.state.domain,
        bizplace: await trxMgr.getRepository(Bizplace).findOne({
          where: { domain: context.state.domain, id: grn.customer }
        }),
        arrivalNotice: await trxMgr.getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name: grn.refNo }
        }),
        creator: context.state.user,
        updater: context.state.user
      })

      return createdGrn
    })
  }
}
