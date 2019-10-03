import { Inventory } from '@things-factory/warehouse-base'
import { getManager, getRepository, In } from 'typeorm'
import { ORDER_STATUS, ORDER_VAS_STATUS, ORDER_TYPES, ORDER_PRODUCT_STATUS } from '../../../constants'
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
      const inventoryIds = foundOIs.map((oi: OrderInventory) => oi.id)
      if (inventoryIds.length) {
        await getRepository(OrderInventory).delete({ id: In(inventoryIds) })
      }

      // 2. delete order vass
      const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
      if (vasIds.length) {
        await getRepository(OrderVas).delete({ id: In(vasIds) })
      }

      // 4. delete do if it's exist
      if (foundDeliveryOrder) {
        foundReleaseGood = await getRepository(ReleaseGood).save({ ...foundReleaseGood, deliveryOrder: null })
        await getRepository(DeliveryOrder).delete({ id: foundDeliveryOrder.id })
      }
      // 5. delete so if it's exist
      if (foundShippingOrder) {
        foundReleaseGood = await getRepository(ReleaseGood).save({ ...foundReleaseGood, shippingOrder: null })
        await getRepository(ShippingOrder).delete({ id: foundShippingOrder.id })
      }

      // Create DO
      if (deliveryOrder) {
        releaseGood.deliveryOrder = await getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
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
          status: ORDER_STATUS.PENDING,
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
      newOrderInventories = await Promise.all(
        newOrderInventories.map(async (oi: OrderInventory) => {
          return {
            ...oi,
            domain: context.state.domain,
            name: OrderNoGenerator.orderInventory(),
            inventory: await getRepository(Inventory).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: oi.inventory.name
              }
            }),
            releaseGood: updatedReleaseGood,
            bizplace: context.state.mainBizplace,
            type: ORDER_TYPES.RELEASE_OF_GOODS,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderInventory).save(newOrderInventories)

      // 3. Create release goods vas
      newOrderVass = await Promise.all(
        newOrderVass.map(async (ov: OrderVas) => {
          return {
            ...ov,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(),
            vas: await getRepository(Vas).findOne({ domain: context.state.domain, id: ov.vas.id }),
            releaseGood: updatedReleaseGood,
            bizplace: context.state.mainBizplace,
            type: ORDER_TYPES.RELEASE_OF_GOODS,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(newOrderVass)

      return updatedReleaseGood
    })
  }
}
