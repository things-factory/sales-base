import { getManager, getRepository } from 'typeorm'
import { ORDER_VAS_STATUS, ORDER_STATUS } from '../../../constants'
import { VasOrder, OrderVas } from '../../../entities'

export const rejectVasOrder = {
  async rejectVasOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const vasOrder: VasOrder = await getRepository(VasOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderVass']
        })

        if (!vasOrder) throw new Error(`Vas order doesn't exists.`)
        if (!patch.remark) throw new Error('Remark is not exist.')
        if (vasOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order vass (PENDING_RECEIVE => READY_TO_EXECUTE)
        vasOrder.orderVass.forEach(async (orderVas: OrderVas) => {
          await getRepository(OrderVas).update(
            { domain: context.state.domain, name: orderVas.name },
            { ...orderVas, status: ORDER_VAS_STATUS.REJECTED, updater: context.state.user }
          )
        })

        await getRepository(VasOrder).save({
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
