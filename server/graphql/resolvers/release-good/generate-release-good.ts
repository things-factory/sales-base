import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ORDER_INVENTORY_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants/order'
import { OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood, shippingOrder }, context: any) {
    return await getManager().transaction(async (trxMgr) => {
      const myBizplace: Bizplace = await getMyBizplace(context.state.user)
      let orderInventories: OrderInventory[] = releaseGood.orderInventories
      let orderVass: OrderVas[] = releaseGood.orderVass
      let createdSO: ShippingOrder

      if (shippingOrder) {
        createdSO = await trxMgr.getRepository(ShippingOrder).save({
          ...shippingOrder,
          name: OrderNoGenerator.shippingOrder(),
          domain: context.state.domain,
          bizplace: myBizplace,
          status: ORDER_STATUS.PENDING,
          creator: context.state.user,
          updater: context.state.user,
        })
      }

      const createdReleaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).save({
        ...releaseGood,
        name: OrderNoGenerator.releaseGood(),
        shippingOrder: createdSO,
        domain: context.state.domain,
        bizplace: myBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user,
      })

      await trxMgr.getRepository(OrderInventory).save(
        await Promise.all(
          orderInventories.map(async (ordInv: OrderInventory) => {
            let newOrderInv: OrderInventory = {
              ...ordInv,
              domain: context.state.domain,
              bizplace: myBizplace,
              status: ORDER_INVENTORY_STATUS.PENDING,
              name: OrderNoGenerator.orderInventory(),
              releaseGood: createdReleaseGood,
              creator: context.state.user,
              updater: context.state.user,
            }

            if (ordInv?.inventory?.id) {
              const foundInv: Inventory = await trxMgr.getRepository(Inventory).findOne({
                where: { domain: context.state.domain, id: newOrderInv.inventory.id },
              })

              await trxMgr.getRepository(Inventory).save({
                ...foundInv,
                lockedQty: newOrderInv.releaseQty,
                lockedWeight: newOrderInv.releaseWeight,
                updater: context.state.user,
              })
            }

            return newOrderInv
          })
        )
      )

      if (orderVass && orderVass.length) {
        orderVass = await Promise.all(
          orderVass.map(async (orderVas: OrderVas) => {
            let newOrderVas = {
              ...orderVas,
              domain: context.state.domain,
              bizplace: myBizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await trxMgr.getRepository(Vas).findOne(orderVas.vas.id),
              type: ORDER_TYPES.RELEASE_OF_GOODS,
              releaseGood: createdReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user,
            }

            if (orderVas?.inventory?.id) {
              newOrderVas.inventory = await trxMgr.getRepository(Inventory).findOne(orderVas.inventory.id)
            }

            return newOrderVas
          })
        )
        await trxMgr.getRepository(OrderVas).save(orderVass)
      }

      return createdReleaseGood
    })
  },
}
