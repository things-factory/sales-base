import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'

export const rejectDeliveryOrder = {
  async rejectDeliveryOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name }
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (!patch.remark) throw new Error('Remark is empty.')
        if (deliveryOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        await getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          ...patch,
          status: ORDER_STATUS.REJECTED,
          updater: context.state.user
        })

        return deliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
