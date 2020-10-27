import { Attachment, createAttachments } from '@things-factory/attachment-base'
import { User } from '@things-factory/auth-base'
import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ATTACHMENT_TYPE } from '../../../constants/attachment-type'
import { ORDER_INVENTORY_STATUS, ORDER_TYPES, ORDER_VAS_STATUS } from '../../../constants/order'
import { ArrivalNotice, OrderInventory, OrderVas, ReturnOrder, Vas } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReturnOrder = {
  async generateReturnOrder(_: any, { returnOrder, file }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const domain = context.state.domain
      const user: User = context.state.user
      const bizplace: Bizplace = await getMyBizplace(user)
      let orderInventories: OrderInventory[] = returnOrder.orderInventories
      let orderVass: OrderVas[] = returnOrder.orderVass

      let newReturnOrder: ReturnOrder = {
        ...returnOrder,
        name: OrderNoGenerator.returnOrder(),
        domain,
        bizplace,
        status: ORDER_STATUS.PENDING,
        creator: user,
        updater: user
      }

      let createdReturnOrder: ReturnOrder = await trxMgr.getRepository(ReturnOrder).save(newReturnOrder)

      for (let oi of orderInventories) {
        let newOrderInv: OrderInventory = Object.assign({}, oi)
        newOrderInv.domain = domain
        newOrderInv.bizplace = bizplace
        newOrderInv.status = ORDER_INVENTORY_STATUS.PENDING
        newOrderInv.name = OrderNoGenerator.orderInventory()
        newOrderInv.returnOrder = createdReturnOrder
        newOrderInv.product = await trxMgr.getRepository(Product).findOne(oi.product.id)
        newOrderInv.creator = user
        newOrderInv.updater = user

        await trxMgr.getRepository(OrderInventory).save(newOrderInv)
      }

      //   if (orderVass?.length) {
      //     orderVass = await Promise.all(
      //       orderVass.map(async orderVas => {
      //         if (orderVas?.targetProduct?.id) {
      //           orderVas.targetProduct = await trxMgr.getRepository(Product).findOne(orderVas.targetProduct.id)
      //         }

      //         let newOrderVas: OrderVas = {
      //           ...orderVas,
      //           domain,
      //           bizplace,
      //           name: OrderNoGenerator.releaseVas(),
      //           vas: await trxMgr.getRepository(Vas).findOne(orderVas.vas.id),
      //           type: ORDER_TYPES.RELEASE_OF_GOODS,
      //           releaseGood: createdReleaseGood,
      //           status: ORDER_VAS_STATUS.PENDING,
      //           creator: user,
      //           updater: user
      //         }

      //         if (orderVas?.inventory?.id) {
      //           newOrderVas.inventory = await trxMgr.getRepository(Inventory).findOne(orderVas.inventory.id)
      //         }

      //         return newOrderVas
      //       })
      //     )

      //     await trxMgr.getRepository(OrderVas).save(orderVass)
      //   }

      if (file?.length > 0) {
        const attachments: Attachment[] = file.map(attachment => {
          return {
            file: attachment,
            refBy: createdReturnOrder.id,
            category: ATTACHMENT_TYPE.RETURN_ORDER
          }
        })
        await createAttachments(_, { attachments }, context)
      }

      return createdReturnOrder
    })
  }
}
