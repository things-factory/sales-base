import { getManager, getRepository } from 'typeorm'
import { ORDER_VAS_STATUS, ORDER_STATUS, ORDER_TYPES } from '../../../constants'
import { OrderVas, Vas, VasOrder } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'
import { Inventory } from '@things-factory/warehouse-base'

export const generateVasOrder = {
  async generateVasOrder(_: any, { vasOrder }, context: any) {
    return await getManager().transaction(async () => {
      let orderVass: OrderVas[] = vasOrder.orderVass

      // 1. Create vas order
      const createdVasOrder: VasOrder = await getRepository(VasOrder).save({
        ...vasOrder,
        name: OrderNoGenerator.vasOrder(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create VasOrder vas
      orderVass = await Promise.all(
        orderVass.map(async (ov: OrderVas) => {
          return {
            ...ov,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(),
            vas: await getRepository(Vas).findOne({ domain: context.state.domain, id: ov.vas.id }),
            inventory: await getRepository(Inventory).findOne(ov.inventory.id),
            vasOrder: createdVasOrder,
            bizplace: context.state.mainBizplace,
            type: ORDER_TYPES.VAS_ORDER,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(orderVass)

      return createdVasOrder
    })
  }
}
