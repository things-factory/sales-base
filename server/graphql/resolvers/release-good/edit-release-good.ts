import { getManager, getRepository, In } from 'typeorm'
import { Inventory } from '@things-factory/warehouse-base'
import { OrderVas, ReleaseGood, Vas, OrderInventory, ShippingOrder, DeliveryOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'
import { create } from 'domain'

export const editReleaseGood = {
  async editReleaseGood(_: any, { name, releaseGood, shippingOrder, deliveryOrder }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const foundReleaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
          where: {
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            name,
            status: ORDER_STATUS.EDITING
          },
          relations: ['deliveryOrder', 'shippingOrder']
        })

        // Validate for existin
        if (!foundReleaseGood) throw new Error("Release goods doesn't exists")

        const foundDeliveryOrder: DeliveryOrder = foundReleaseGood.deliveryOrder
        const foundShippingOrder: ShippingOrder = foundReleaseGood.shippingOrder
        const foundOrderInventories: OrderInventory[] = await getRepository(OrderInventory).find({
          where: {
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            status: ORDER_STATUS.PENDING,
            releaseGood: foundReleaseGood
          }
        })
        const foundOrderVass: OrderVas[] = await getRepository(OrderVas).find({
          where: {
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            status: ORDER_STATUS.PENDING,
            releaseGood: foundReleaseGood
          }
        })

        // delete related records
        // 1. delete order inventory
        await getRepository(OrderInventory).delete({ id: In(foundOrderInventories.map((oi: OrderInventory) => oi.id)) })
        // 2. delete order vas
        await getRepository(OrderVas).delete({ id: In(foundOrderVass.map((ov: OrderVas) => ov.id)) })
        // 3. delete release goods
        await getRepository(ReleaseGood).delete({ ...foundReleaseGood })
        // 4. delete do if it's exist
        if (foundDeliveryOrder) await getRepository(DeliveryOrder).delete({ ...foundDeliveryOrder })
        // 5. delete so if it's exist
        if (foundShippingOrder) await getRepository(ShippingOrder).delete({ ...foundShippingOrder })

        const newReleaseGood: ReleaseGood = releaseGood
        const newShippingOrder: ShippingOrder = shippingOrder
        const newDeliveryOrder: DeliveryOrder = deliveryOrder
        const newOrderInventories: OrderInventory[] = releaseGood.orderInventories
        const newOrderVass: OrderVas[] = releaseGood.orderVass
        let createdDO: DeliveryOrder = null
        let createdSO: ShippingOrder = null

        // Use transportation => Create DO
        if (!newReleaseGood.ownTransport) {
          createdDO = await getRepository(DeliveryOrder).save({
            name: OrderNoGenerator.deliveryOrder(),
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            from: newReleaseGood.from,
            to: newReleaseGood.to,
            loadType: newReleaseGood.loadType,
            ...newDeliveryOrder,
            creator: context.state.user,
            updater: context.state.user
          })
        }

        // There's shipping order => Create SO
        if (newReleaseGood.shippingOption) {
          createdSO = await getRepository(ShippingOrder).save({
            name: OrderNoGenerator.shippingOrder(),
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            from: newReleaseGood.from,
            to: newReleaseGood.to,
            loadType: newReleaseGood.loadType,
            ...newShippingOrder,
            creator: context.state.user,
            updater: context.state.user
          })
        }

        // Create release good
        const createdReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
          name: OrderNoGenerator.releaseGood(),
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          ...newReleaseGood,
          deliveryOrder: createdDO,
          shippingOrder: createdSO,
          creator: context.state.user,
          updater: context.state.user
        })

        // 2. Create release good inventory
        await Promise.all(
          newOrderInventories.map(async (inventory: OrderInventory) => {
            return {
              ...inventory,
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: OrderNoGenerator.orderInventory(),
              inventory: await getRepository(Inventory).findOne({
                where: {
                  domain: context.state.domain,
                  bizplace: context.state.mainBizplace,
                  name: inventory.name
                }
              }),
              releaseGood: createdReleaseGood,
              status: ORDER_PRODUCT_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderInventory).save(newOrderInventories)

        // 3. Create arrival notice vas
        await Promise.all(
          newOrderVass.map(async (vas: OrderVas) => {
            return {
              ...vas,
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await getRepository(Vas).findOne(vas.vas.id),
              releaseGood: createdReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderVas).save(newOrderVass)

        return createdReleaseGood
      } catch (e) {
        throw e
      }
    })
  }
}
