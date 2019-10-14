import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { VasOrder } from '../../../entities'

export const confirmVasOrder = {
  async confirmVasOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const foundVasOrder: VasOrder = await trxMgr.getRepository(VasOrder).findOne({
        where: { domain: context.state.domain, name },
        relations: ['orderVass', 'orderVass.vas', 'creator', 'updater']
      })

      let vasOrder: VasOrder
      if (!foundVasOrder) throw new Error(`Vas order doesn't exists.`)
      if (foundVasOrder.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. Vas Order Status change (PENDING => PENDING_RECEIVE)
      vasOrder = await trxMgr.getRepository(VasOrder).save({
        ...foundVasOrder,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      return vasOrder
    })
  }
}
