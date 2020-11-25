import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory } from '../../../entities'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'
import { ContactPoint } from '@things-factory/biz-base'
import { TransportDriver, TransportVehicle, TRUCK_STATUS } from '@things-factory/transport-base'
import { Inventory } from '@things-factory/warehouse-base'
import { Product } from '@things-factory/product-base'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { orderInfo, orderItems }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const { domain, user }: { domain: Domain; user: User } = context.state
        const foundDeliveryOrder: DeliveryOrder = await trxMgr.getRepository(DeliveryOrder).findOne({
          where: { domain, name: orderInfo.name, status: ORDER_STATUS.READY_TO_DISPATCH },
          relations: ['transportVehicle', 'bizplace']
        })

        let orderInventories: OrderInventory[]
        orderInventories = await trxMgr.getRepository(OrderInventory).find({
          where: { domain, deliveryOrder: foundDeliveryOrder },
          relations: ['inventory', 'inventory.product']
        })

        orderInventories = orderInventories.map((orderInventory: OrderInventory)=> {
          const inventory: Inventory = orderInventory.inventory
          const product: Product = inventory.product
          const foundItem = inventory.reusablePallet ? orderItems.filter((item: any) => item.productName === `${product.name} (${product.description})` && item.pallet === inventory.reusablePallet.name) : orderItems.filter((item: any) => item.productName === `${product.name} (${product.description})`)
          
          if (foundItem[0].remark !== '') orderInventory.remark = foundItem[0].remark
          return orderInventory
        })
        await trxMgr.getRepository(OrderInventory).save(orderInventories)

        if (!foundDeliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (foundDeliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)
        if (foundDeliveryOrder.status === ORDER_STATUS.PENDING_CANCEL)
          throw new Error('Release order is pending for cancel')

        // if there is other destination value, create a new contact point
        let foundCP: any = {}
        if (orderInfo?.otherDestination) {
          foundCP = {
            domain,
            name: orderInfo.contactName,
            bizplace: foundDeliveryOrder.bizplace,
            address: orderInfo.otherDestination,
            creator: user
          }
          foundCP = await trxMgr.getRepository(ContactPoint).save(foundCP)
        } else {
          foundCP = await trxMgr.getRepository(ContactPoint).findOne({
            where: { domain, id: orderInfo.contactPoint, bizplace: foundDeliveryOrder.bizplace }
          })
        }

        let transportDriver: TransportDriver = null
        let transportVehicle: TransportVehicle = null
        if (orderInfo?.ownDriver) {
          transportDriver = await trxMgr.getRepository(TransportDriver).findOne({
            where: { domain, name: orderInfo.ownDriver }
          })
        }

        if (orderInfo?.ownTruck) {
          transportVehicle = await trxMgr.getRepository(TransportVehicle).findOne({
            where: { domain, name: orderInfo.ownTruck }
          })

          await trxMgr.getRepository(TransportVehicle).save({
            ...transportVehicle,
            status: TRUCK_STATUS.IN_USE,
            updater: user
          })
        }

        await trxMgr.getRepository(DeliveryOrder).save({
          ...foundDeliveryOrder,
          transportDriver,
          transportVehicle,
          contactPointRefId: foundCP.id || null,
          otherDriver: orderInfo?.otherDriver || null,
          truckNo: orderInfo?.otherTruck || orderInfo?.ownTruck,
          to: foundCP.address,
          deliveryDate: orderInfo.deliveryDate,
          remark: orderInfo.remark,
          status: ORDER_STATUS.DELIVERING,
          reusablePallet: orderInfo.reusablePallet,
          updater: user
        })

        return foundDeliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
