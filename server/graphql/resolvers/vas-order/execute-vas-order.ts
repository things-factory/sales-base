import { getManager, getRepository } from 'typeorm'
import { ORDER_VAS_STATUS, ORDER_STATUS } from '../../../constants'
import { OrderVas, VasOrder } from '../../../entities'

export const executeVasOrder = {
  async executeVasOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const vasOrder: VasOrder = await getRepository(VasOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderVass']
        })

        if (!vasOrder) throw new Error(`Vas order doesn't exists.`)
        if (vasOrder.status !== ORDER_STATUS.READY_TO_PICK) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (READY_TO_PICK => PICKING)
        vasOrder.orderVass.forEach(async (orderVas: OrderVas) => {
          await getRepository(OrderVas).update(
            { domain: context.state.domain, name: orderVas.name },
            { ...orderVas, status: ORDER_VAS_STATUS.EXECUTING, updater: context.state.user }
          )
        })

        await getRepository(VasOrder).save({
          ...vasOrder,
          status: ORDER_STATUS.EXECUTING,
          updater: context.state.user
        })

        return vasOrder
      } catch (e) {
        throw e
      }
    })
  }
}
