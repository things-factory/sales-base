import { Inventory } from '@things-factory/warehouse-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood, shippingOrder }, context: any) {
    return await getManager().transaction(async () => {
      let orderInventories: OrderInventory[] = releaseGood.orderInventories
      let orderVass: OrderVas[] = releaseGood.orderVass

      const createdReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
        ...releaseGood,
        name: OrderNoGenerator.releaseGood(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      if (shippingOrder) {
        await getRepository(ShippingOrder).save({
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
            name: OrderNoGenerator.orderInventory(),
            inventory: await getRepository(Inventory).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: orderInventory.inventory.name
              }
            }),
            releaseGood: createdReleaseGood,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderInventory).save(orderInventories)

      if (orderVass && orderVass.length) {
        orderVass = await Promise.all(
          orderVass.map(async (orderVas: OrderVas) => {
            return {
              ...orderVas,
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await getRepository(Vas).findOne(orderVas.vas.id),
              releaseGood: createdReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderVas).save(orderVass)
      }

      return createdReleaseGood
    })
  }
}
