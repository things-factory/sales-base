import { User } from '@things-factory/auth-base'
import { Bizplace, ContactPoint } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { TransportDriver, TransportVehicle, TRUCK_STATUS } from '@things-factory/transport-base'
import { EntityManager, getManager, getRepository, Repository, In } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { OrderNoGenerator } from '../../../utils'
import { DeliveryOrder, ReleaseGood, OrderInventory } from '../../../entities'

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
   * 1. Validation for creating DO
   *    - data existing
   */

  const deliveryOrderRepo: Repository<DeliveryOrder> = trxMgr
    ? trxMgr.getRepository(DeliveryOrder)
    : getRepository(DeliveryOrder)
  const transportDriverRepo: Repository<TransportDriver> = trxMgr
    ? trxMgr.getRepository(TransportDriver)
    : getRepository(TransportDriver)
  const transportVehicleRepo: Repository<TransportVehicle> = trxMgr
    ? trxMgr.getRepository(TransportVehicle)
    : getRepository(TransportVehicle)
  const orderInventoryRepo: Repository<OrderInventory> = trxMgr
    ? trxMgr.getRepository(OrderInventory)
    : getRepository(OrderInventory)
  const contactPointRepo: Repository<ContactPoint> = trxMgr
    ? trxMgr.getRepository(ContactPoint)
    : getRepository(ContactPoint)

  if (!transportDriver || !transportVehicle) throw new Error(`Driver and truck information is incomplete`)
  const customerContact: ContactPoint = await contactPointRepo.findOne({
    where: { domain, bizplace: customerBizplace }
  })

  // 3. Create delivery order
  const createdDeliveryOrder: DeliveryOrder = await deliveryOrderRepo.save({
    domain,
    name: OrderNoGenerator.deliveryOrder(),
    bizplace: customerBizplace,
    releaseGood: releaseGood,
    to: customerBizplace.address,
    telNo: customerContact.phone,
    transportDriver: await transportDriverRepo.findOne({
      where: { domain, id: transportDriver.id }
    }),
    transportVehicle: await transportVehicleRepo.findOne({
      where: { domain, id: transportVehicle.id }
    }),
    status: ORDER_STATUS.PENDING,
    creator: user,
    updater: user
  })

  // 4. Update delivery order ID of order inventories
  targetInventories = await Promise.all(
    targetInventories.map(async (targetInventory: OrderInventory) => {
      return {
        ...targetInventory,
        deliveryOrder: createdDeliveryOrder,
        updater: user
      }
    })
  )
  await orderInventoryRepo.save(targetInventories)

  return createdDeliveryOrder
}
