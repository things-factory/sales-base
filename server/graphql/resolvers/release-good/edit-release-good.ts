import { getManager, getRepository, In } from 'typeorm'
import { Inventory } from '@things-factory/warehouse-base'
import { OrderVas, ReleaseGood, Vas, OrderInventory, ShippingOrder, DeliveryOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editReleaseGood = {
  async editReleaseGood(_: any, { name, releaseGood }, context: any) {
    const foundReleaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderInventories', 'orderVass', 'deliveryOrder', 'shippingOrder', 'creator', 'updater']
    })

    try {
      if (!foundReleaseGood) throw new Error(`Release good doesn't exists.`)
      if (foundReleaseGood.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async () => {
        // 1. delete order products
        const orderInventoryIds = foundReleaseGood.orderInventories.map(inventory => inventory.id)
        await getRepository(OrderInventory).delete({ id: In(orderInventoryIds) })

        // 2. delete order vass
        const orderVasIds = foundReleaseGood.orderVass.map(vas => vas.id)
        await getRepository(OrderVas).delete({ id: In(orderVasIds) })

        // 3. delete shipping order
        const shippingOrderId = foundReleaseGood.shippingOrder.id
        await getRepository(ShippingOrder).delete({
          domain: context.state.domain,
          bizplace: context.state.bizplaces[0],
          id: shippingOrderId
        })

        // 4. delete delivery order
        const deliveryOrderId = foundReleaseGood.deliveryOrder.id
        await getRepository(DeliveryOrder).delete({
          domain: context.state.domain,
          bizplace: context.state.bizplaces[0],
          id: deliveryOrderId
        })

        // 5. update arrival notice
        const updatedReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
          ...foundReleaseGood,
          ...releaseGood.releaseGood,
          updater: context.state.user
        })

        if (!releaseGood.ownTransport) {
          await getRepository(DeliveryOrder).save({
            name: OrderNoGenerator.deliveryOrder(),
            domain: context.state.domain,
            bizplace: context.state.bizplaces[0],
            deliveryDateTime: releaseGood.deliveryDateTime,
            from: releaseGood.from,
            to: releaseGood.to,
            loadType: releaseGood.loadType,
            status: ORDER_STATUS.PENDING
          })
        }

        if (!releaseGood.shippingOption) {
          await getRepository(ShippingOrder).save({
            name: OrderNoGenerator.shippingOrder(),
            domain: context.state.domain,
            bizplace: context.state.bizplaces[0],
            shipName: releaseGood.shipName,
            containerNo: releaseGood.containerNo,
            from: releaseGood.from,
            to: releaseGood.to,
            status: ORDER_STATUS.PENDING
          })
        }

        // 4. create order inventories
        const inventories = await Promise.all(
          releaseGood.inventories.map(async (inventory: OrderInventory) => {
            return {
              ...inventory,
              domain: context.state.domain,
              name: OrderNoGenerator.orderInventory(),
              inventory: await getRepository(Inventory).findOne(inventory.inventory.id),
              releaseGood: updatedReleaseGood,
              status: ORDER_PRODUCT_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderInventory).save(inventories)

        // 5. create order vas
        const vass = await Promise.all(
          releaseGood.vass.map(async (vas: OrderVas) => {
            return {
              ...vas,
              domain: context.state.domain,
              name: OrderNoGenerator.releaseVas(),
              vas: await getRepository(Vas).findOne(vas.vas.id),
              releaseGood: updatedReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderVas).save(vass)

        return updatedReleaseGood
      })
    } catch (e) {
      throw e
    }
  }
}
