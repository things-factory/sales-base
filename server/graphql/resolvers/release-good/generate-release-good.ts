import { Inventory } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ORDER_INVENTORY_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants/order'
import { OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood, shippingOrder }, context: any) {
    return await getManager().transaction(async trxMgr => {
      let orderInventories: OrderInventory[] = releaseGood.orderInventories
      let orderVass: OrderVas[] = releaseGood.orderVass

      const createdReleaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).save({
        ...releaseGood,
        name: OrderNoGenerator.releaseGood(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      if (shippingOrder) {
        await trxMgr.getRepository(ShippingOrder).save({
          ...shippingOrder,
          name: OrderNoGenerator.shippingOrder(),
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          status: ORDER_STATUS.PENDING,
          creator: context.state.user,
          updater: context.state.user
        })
      }

      orderInventories = await Promise.all(
        orderInventories.map(async (orderInventory: OrderInventory) => {
          return {
            ...orderInventory,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            status: ORDER_INVENTORY_STATUS.PENDING,
            name: OrderNoGenerator.orderInventory(),
            inventory: await trxMgr.getRepository(Inventory).findOne(orderInventory.inventory.id),
            releaseGood: createdReleaseGood,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await trxMgr.getRepository(OrderInventory).save(orderInventories)

      if (orderVass && orderVass.length) {
        orderVass = await Promise.all(
          orderVass.map(async (orderVas: OrderVas) => {
            return {
              ...orderVas,
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await trxMgr.getRepository(Vas).findOne(orderVas.vas.id),
              inventory: await trxMgr.getRepository(Inventory).findOne(orderVas.inventory.id),
              type: ORDER_TYPES.RELEASE_OF_GOODS,
              releaseGood: createdReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await trxMgr.getRepository(OrderVas).save(orderVass)
      }

      return createdReleaseGood
    })
  }
}
