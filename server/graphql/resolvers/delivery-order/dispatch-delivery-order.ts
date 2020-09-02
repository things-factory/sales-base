import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'
import { ContactPoint } from '@things-factory/biz-base'
import { TransportDriver, TransportVehicle, TRUCK_STATUS } from '@things-factory/transport-base'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { orderInfo }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const foundDeliveryOrder: DeliveryOrder = await trxMgr.getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name: orderInfo.name },
          relations: ['transportVehicle', 'bizplace']
        })

        if (!foundDeliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (foundDeliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)
        if (foundDeliveryOrder.status === ORDER_STATUS.PENDING_CANCEL)
          throw new Error('Release order is pending for cancel')

        // if there is other destination value, create a new contact point
        let foundCP: any = {}
        if (orderInfo?.otherDestination) {
          foundCP = {
            domain: context.state.domain,
            name: orderInfo.contactName,
            bizplace: foundDeliveryOrder.bizplace,
            address: orderInfo.otherDestination,
            creator: context.state.user
          }
          foundCP = await trxMgr.getRepository(ContactPoint).save(foundCP)
        } else {
          foundCP = await trxMgr.getRepository(ContactPoint).findOne({
            where: { domain: context.state.domain, id: orderInfo.contactPoint }
          })
        }

        let transportDriver: TransportDriver = null
        let transportVehicle: TransportVehicle = null
        if (orderInfo?.ownDriver) {
          transportDriver = await trxMgr.getRepository(TransportDriver).findOne({
            where: { domain: context.state.domain, name: orderInfo.ownDriver }
          })
        }

        if (orderInfo?.ownTruck) {
          transportVehicle = await trxMgr.getRepository(TransportVehicle).findOne({
            where: { domain: context.state.domain, name: orderInfo.ownTruck }
          })

          await trxMgr.getRepository(TransportVehicle).save({
            ...transportVehicle,
            status: TRUCK_STATUS.IN_USE,
            updater: context.state.user
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
          status: ORDER_STATUS.DELIVERING,
          reusablePallet: orderInfo.reusablePallet,
          updater: context.state.user
        })

        return foundDeliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
