import { Attachment, createAttachments } from '@things-factory/attachment-base'
import { User } from '@things-factory/auth-base'
import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ATTACHMENT_TYPE } from '../../../constants/attachment-type'
import { ORDER_INVENTORY_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants/order'
import { ArrivalNotice, OrderInventory, OrderVas, ReleaseGood, ShippingOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood, shippingOrder, file }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const domain = context.state.domain
      const user: User = context.state.user
      const bizplace: Bizplace = await getMyBizplace(user)
      let orderInventories: OrderInventory[] = releaseGood.orderInventories
      let orderVass: OrderVas[] = releaseGood.orderVass
      let createdSO: ShippingOrder

      if (shippingOrder) {
        createdSO = await trxMgr.getRepository(ShippingOrder).save({
          ...shippingOrder,
          name: OrderNoGenerator.shippingOrder(),
          domain,
          bizplace,
          status: ORDER_STATUS.PENDING,
          creator: user,
          updater: user
        })
      }

      let newReleaseGood: ReleaseGood = {
        ...releaseGood,
        name: OrderNoGenerator.releaseGood(),
        shippingOrder: createdSO,
        domain,
        bizplace,
        status: ORDER_STATUS.PENDING,
        creator: user,
        updater: user
      }

      // Make relation with GAN for cross docking
      let crossDockingGAN: ArrivalNotice = undefined
      if (releaseGood.crossDocking && releaseGood.ganNo) {
        crossDockingGAN = await trxMgr.getRepository(ArrivalNotice).findOne({
          where: { domain, bizplace, name: releaseGood.ganNo, status: ORDER_STATUS.PENDING }
        })
        if (!crossDockingGAN) throw new Error(`Failed to find GAN (${releaseGood.ganNo}) for cross docking`)

        newReleaseGood.arrivalNotice = crossDockingGAN
      }

      let createdReleaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).save(newReleaseGood)

      // Make relation with RO for cross docking
      if (createdReleaseGood.crossDocking) {
        crossDockingGAN.releaseGood = createdReleaseGood
        await trxMgr.getRepository(ArrivalNotice).save(crossDockingGAN)
      }

      for (let oi of orderInventories) {
        let newOrderInv: OrderInventory = Object.assign({}, oi)
        newOrderInv.domain = domain
        newOrderInv.bizplace = bizplace
        newOrderInv.status = ORDER_INVENTORY_STATUS.PENDING
        newOrderInv.name = OrderNoGenerator.orderInventory()
        newOrderInv.releaseGood = createdReleaseGood
        newOrderInv.product = await trxMgr.getRepository(Product).findOne(oi.product.id)
        newOrderInv.creator = user
        newOrderInv.updater = user

        if (newOrderInv.inventory?.id) {
          const foundInv: Inventory = await trxMgr.getRepository(Inventory).findOne(newOrderInv.inventory.id)
          newOrderInv.inventory = foundInv

          foundInv.lockedQty = Number(foundInv.lockedQty) + newOrderInv.releaseQty
          foundInv.lockedWeight = Number(foundInv.lockedWeight) + newOrderInv.releaseWeight
          foundInv.updater = user

          await trxMgr.getRepository(Inventory).save(foundInv)
        }

        await trxMgr.getRepository(OrderInventory).save(newOrderInv)
      }

      if (orderVass?.length) {
        orderVass = await Promise.all(
          orderVass.map(async orderVas => {
            if (orderVas?.targetProduct?.id) {
              orderVas.targetProduct = await trxMgr.getRepository(Product).findOne(orderVas.targetProduct.id)
            }

            let newOrderVas: OrderVas = {
              ...orderVas,
              domain,
              bizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await trxMgr.getRepository(Vas).findOne(orderVas.vas.id),
              type: ORDER_TYPES.RELEASE_OF_GOODS,
              releaseGood: createdReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: user,
              updater: user
            }

            if (orderVas?.inventory?.id) {
              newOrderVas.inventory = await trxMgr.getRepository(Inventory).findOne(orderVas.inventory.id)
            }

            return newOrderVas
          })
        )

        await trxMgr.getRepository(OrderVas).save(orderVass)
      }

      if (file?.length > 0) {
        const attachments: Attachment[] = file.map(attachment => {
          return {
            file: attachment,
            refBy: createdReleaseGood.id,
            category: ATTACHMENT_TYPE.DELIVERY_ORDER
          }
        })
        await createAttachments(_, { attachments }, context)
      }

      return createdReleaseGood
    })
  }
}
