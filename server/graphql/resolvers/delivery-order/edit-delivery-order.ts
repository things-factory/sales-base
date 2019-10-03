import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'

export const editDeliveryOrder = {
  async editDeliveryOrder(_: any, { name, deliveryOrder }, context: any) {
    const foundDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
      where: { domain: context.state.domain, name, status: ORDER_STATUS.EDITING },
      relations: ['creator', 'updater']
    })

    try {
      if (!foundDeliveryOrder) throw new Error(`Delivery order doesn't exists.`)
      if (foundDeliveryOrder.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async () => {
        // 1. update delivery order
        const updatedDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).save({
          ...foundDeliveryOrder,
          ...deliveryOrder,
          status: ORDER_STATUS.PENDING,
          updater: context.state.user
        })

        return updatedDeliveryOrder
      })
    } catch (e) {
      throw e
    }
  }
}
