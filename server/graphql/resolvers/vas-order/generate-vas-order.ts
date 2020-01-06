import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants'
import { OrderVas, Vas, VasOrder } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateVasOrder = {
  async generateVasOrder(_: any, { vasOrder }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const myBizplace: Bizplace = await getMyBizplace(context.state.user)
      let orderVass: OrderVas[] = vasOrder.orderVass

      // 1. Create vas order
      const createdVasOrder: VasOrder = await trxMgr.getRepository(VasOrder).save({
        ...vasOrder,
        name: OrderNoGenerator.vasOrder(),
        domain: context.state.domain,
        bizplace: myBizplace,
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
            vas: await trxMgr.getRepository(Vas).findOne({ domain: context.state.domain, id: ov.vas.id }),
            inventory: await trxMgr.getRepository(Inventory).findOne(ov.inventory.id),
            vasOrder: createdVasOrder,
            bizplace: myBizplace,
            type: ORDER_TYPES.VAS_ORDER,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await trxMgr.getRepository(OrderVas).save(orderVass)

      return createdVasOrder
    })
  }
}
