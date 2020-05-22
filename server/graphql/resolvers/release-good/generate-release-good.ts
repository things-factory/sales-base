import { Attachment, createAttachment, deleteAttachment } from '@things-factory/attachment-base'
import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ORDER_INVENTORY_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants/order'
import { ATTACHMENT_TYPE } from '../../../constants/attachment-type'
import { OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood, shippingOrder, file }, context: any) {
    return await getManager().transaction(async trxMgr => {
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
          updater: context.state.user
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
        updater: context.state.user
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
              updater: context.state.user
            }

            if (ordInv?.inventory?.id) {
              newOrderInv.inventory = await trxMgr.getRepository(Inventory).findOne(ordInv.inventory.id)
              const foundInv: Inventory = newOrderInv.inventory

              await trxMgr.getRepository(Inventory).save({
                ...foundInv,
                lockedQty: Boolean(foundInv.lockedQty)
                  ? newOrderInv.releaseQty + foundInv.lockedQty
                  : newOrderInv.releaseQty,
                lockedWeight: Boolean(foundInv.lockedWeight)
                  ? newOrderInv.releaseWeight + foundInv.lockedWeight
                  : newOrderInv.releaseWeight,
                updater: context.state.user
              })
            }

            return newOrderInv
          })
        )
      )

      if (orderVass?.length) {
        orderVass = await Promise.all(
          orderVass.map(async orderVas => {
            if (orderVas?.targetProduct?.id) {
              orderVas.targetProduct = await trxMgr.getRepository(Product).findOne(orderVas.targetProduct.id)
            }

            let newOrderVas: OrderVas = {
              ...orderVas,
              domain: context.state.domain,
              bizplace: myBizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await trxMgr.getRepository(Vas).findOne(orderVas.vas.id),
              type: ORDER_TYPES.RELEASE_OF_GOODS,
              releaseGood: createdReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }

            if (orderVas?.inventory?.id) {
              newOrderVas.inventory = await trxMgr.getRepository(Inventory).findOne(orderVas.inventory.id)
            }

            return newOrderVas
          })
        )

        await trxMgr.getRepository(OrderVas).save(orderVass)
      }

      if (createdReleaseGood?.ownTransport) {
        const foundAttachment: Attachment = await trxMgr.getRepository(Attachment).findOne({
          where: { domain: context.state.domain, refBy: createdReleaseGood.id }
        })

        const attachment = {
          refBy: createdReleaseGood.id,
          file: file,
          category: ATTACHMENT_TYPE.DELIVERY_ORDER
        }

        if (!foundAttachment) {
          await createAttachment(_, { attachment }, context)
        } else {
          const id = foundAttachment.id
          await deleteAttachment(_, { id }, context)
          await createAttachment(_, { attachment }, context)
        }
      }

      return createdReleaseGood
    })
  }
}
