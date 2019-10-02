import { Inventory } from '@things-factory/warehouse-base'
import { getManager, getRepository, In } from 'typeorm'
import { ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editReleaseGood = {
  async editReleaseGood(_: any, { name, releaseGood, shippingOrder, deliveryOrder }, context: any) {
    return await getManager().transaction(async () => {
      let newOrderInventories: OrderInventory[] = releaseGood.orderInventories
      let newOrderVass: OrderVas[] = releaseGood.orderVass

      let foundReleaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
        where: {
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          name,
          status: ORDER_STATUS.EDITING
        },
        relations: ['deliveryOrder', 'shippingOrder', 'orderInventories', 'orderVass', 'creator', 'updater']
      })

      // Validate for existin
      if (!foundReleaseGood) throw new Error("Release goods doesn't exists")
      const foundDeliveryOrder: DeliveryOrder = foundReleaseGood.deliveryOrder
      const foundShippingOrder: ShippingOrder = foundReleaseGood.shippingOrder
      const foundOIs: OrderInventory[] = await getRepository(OrderInventory).find({
        where: {
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          status: ORDER_STATUS.PENDING,
          releaseGood: foundReleaseGood
        }
      })
      const foundOVs: OrderVas[] = await getRepository(OrderVas).find({
        where: {
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          status: ORDER_STATUS.PENDING,
          releaseGood: foundReleaseGood
        }
      })

      // 1. delete order products
      await getRepository(OrderInventory).delete({ id: In(foundOIs.map((oi: OrderInventory) => oi.id)) })

      // 2. delete order vass
      await getRepository(OrderVas).delete({ id: In(foundOVs.map((ov: OrderVas) => ov.id)) })

      // 3. delete release goods
      await getRepository(ReleaseGood).delete({ ...foundReleaseGood })
      // 4. delete do if it's exist
      if (foundDeliveryOrder) {
        foundReleaseGood = await getRepository(DeliveryOrder).save({ ...foundReleaseGood, deliveryOrder: null })
        await getRepository(DeliveryOrder).delete({ id: foundDeliveryOrder.id })
      }
      // 5. delete so if it's exist
      if (foundShippingOrder) {
        foundReleaseGood = await getRepository(DeliveryOrder).save({ ...foundReleaseGood, shippingOrder: null })
        await getRepository(ShippingOrder).delete({ id: foundShippingOrder.id })
      }

      // Create DO
      if (deliveryOrder) {
        releaseGood.deliveryOrder = await getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          name: OrderNoGenerator.deliveryOrder(),
          status: ORDER_STATUS.PENDING,
          creator: context.state.user,
          updater: context.state.user
        })
      }

      // create SO
      if (shippingOrder) {
        releaseGood.shippingOrder = await getRepository(ShippingOrder).save({
          ...shippingOrder,
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          name: OrderNoGenerator.shippingOrder(),
          creator: context.state.user,
          updater: context.state.user
        })
      }

      // update release good
      const updatedReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
        ...foundReleaseGood,
        ...releaseGood,
        status: ORDER_STATUS.PENDING,
        updater: context.state.user
      })

      // 2. Create release good inventory
      await Promise.all(
        newOrderInventories.map(async (orderInventory: OrderInventory) => {
          await getRepository(OrderInventory).save({
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
            releaseGood: updatedReleaseGood,
            creator: context.state.user,
            updater: context.state.user
          })
        })
      )

      // 3. Create arrival notice vas
      await Promise.all(
        newOrderVass.map(async (vas: OrderVas) => {
          await getRepository(OrderVas).save({
            ...vas,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            name: OrderNoGenerator.releaseVas(),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            releaseGood: updatedReleaseGood,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          })
        })
      )

      return updatedReleaseGood
    })
  }
}
