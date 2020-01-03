import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, ReleaseGood } from '../../../entities'
import { OrderNoGenerator } from '../../../utils'

export const generateDeliveryOrderResolver = {
  async generateDeliveryOrder(
    _: any,
    { transportDriver, transportVehicle, customerBizplace, releaseGood, targetInventories },
    context: any
  ) {
    return await getManager().transaction(async trxMgr => {
      return await generateDeliveryOrder(
        transportDriver,
        transportVehicle,
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
  transportDriver: TransportDriver,
  transportVehicle: TransportVehicle,
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
  const transportDriverRepo: Repository<TransportDriver> =
    trxMgr?.getRepository(TransportDriver) || getRepository(TransportDriver)
  const transportVehicleRepo: Repository<TransportVehicle> =
    trxMgr?.getRepository(TransportVehicle) || getRepository(TransportVehicle)
  const orderInventoryRepo: Repository<OrderInventory> =
    trxMgr?.getRepository(OrderInventory) || getRepository(OrderInventory)

  if (!transportVehicle?.id) throw new Error(`Truck information is incomplete`)

  let deliveryOrder: any = {
    domain,
    name: OrderNoGenerator.deliveryOrder(),
    bizplace: customerBizplace,
    releaseGood,
    transportVehicle: await transportVehicleRepo.findOne(transportVehicle.id),
    status: ORDER_STATUS.PENDING,
    creator: user,
    updater: user
  }

  if (transportDriver?.id) {
    deliveryOrder.transportDriver = await transportDriverRepo.findOne({
      where: { domain, id: transportDriver.id }
    })
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
