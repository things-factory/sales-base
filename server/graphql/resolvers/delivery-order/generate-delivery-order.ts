import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { TransportVehicle } from '@things-factory/transport-base'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, ReleaseGood } from '../../../entities'
import { generateId } from '@things-factory/id-rule-base'

export const generateDeliveryOrderResolver = {
  async generateDeliveryOrder(_: any, { orderInfo, customerBizplace, releaseGood, targetInventories }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await generateDeliveryOrder(
        orderInfo,
        customerBizplace,
        releaseGood,
        targetInventories,
        context.state.domain,
        context.state.user,
        trxMgr
      )
    })
  }
}

export async function generateDeliveryOrder(
  orderInfo: DeliveryOrder,
  targetInventories: OrderInventory[],
  customerBizplace: Bizplace,
  releaseGood: ReleaseGood,
  domain: Domain,
  user: User,
  trxMgr?: EntityManager
): Promise<DeliveryOrder> {
  /**
   * 1. Validation for creating DO - data existing
   */
  const deliveryOrderRepo: Repository<DeliveryOrder> =
    trxMgr?.getRepository(DeliveryOrder) || getRepository(DeliveryOrder)
  const transportVehicleRepo: Repository<TransportVehicle> =
    trxMgr?.getRepository(TransportVehicle) || getRepository(TransportVehicle)
  const orderInventoryRepo: Repository<OrderInventory> =
    trxMgr?.getRepository(OrderInventory) || getRepository(OrderInventory)

  let transportVehicle: TransportVehicle = null
  if (orderInfo?.truckNo) {
    transportVehicle = await transportVehicleRepo.findOne({
      where: { domain, name: orderInfo.truckNo }
    })
  }

  const orderNo: string = await generateId({ domain, type: 'do_number', seed: {} })

  let deliveryOrder: any = {
    domain,
    name: orderNo,
    bizplace: customerBizplace,
    releaseGood,
    ownCollection: releaseGood.ownTransport,
    truckNo: orderInfo?.truckNo || null,
    palletQty: orderInfo?.palletQty || null,
    transportVehicle,
    status: ORDER_STATUS.READY_TO_DISPATCH,
    creator: user,
    updater: user
  }

  deliveryOrder = <DeliveryOrder>await deliveryOrderRepo.save(deliveryOrder)

  targetInventories = targetInventories.map((targetInventory: OrderInventory) => {
    return {
      ...targetInventory,
      deliveryOrder,
      updater: user
    }
  })
  await orderInventoryRepo.save(targetInventories)

  return deliveryOrder
}
