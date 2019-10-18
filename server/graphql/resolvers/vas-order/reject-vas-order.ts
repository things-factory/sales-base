import { getManager } from 'typeorm'
import { ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderVas, VasOrder } from '../../../entities'

export const rejectVasOrder = {
  async rejectVasOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        if (!patch.remark) throw new Error('Remark is not exist.')

        const vasOrder: VasOrder = await trxMgr.getRepository(VasOrder).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.PENDING_RECEIVE },
          relations: ['orderVass']
        })
        if (!vasOrder) throw new Error(`Vas order doesn't exists.`)

        // 1. Update status of order vass (PENDING_RECEIVE => REJECTED)
        const orderVass: OrderVas[] = vasOrder.orderVass.map((orderVas: OrderVas) => {
          return {
            ...orderVas,
            status: ORDER_VAS_STATUS.REJECTED,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(OrderVas).save(orderVass)

        await trxMgr.getRepository(VasOrder).save({
          ...vasOrder,
          ...patch,
          status: ORDER_STATUS.REJECTED,
          updater: context.state.user
        })

        return vasOrder
      } catch (e) {
        throw e
      }
    })
  }
}
