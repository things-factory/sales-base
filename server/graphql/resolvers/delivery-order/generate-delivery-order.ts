import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder, ReleaseGood } from '../../../entities'

export const generateDeliveryOrderResolver = {
  async generateDeliveryOrder(_: any, { deliveryOrder }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await generateDeliveryOrder(deliveryOrder, context.state.domain, context.state.user, trxMgr)
    })
  }
}

export async function generateDeliveryOrder(
  deliveryOrder: any,
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
  const releaseOrderRepo: Repository<ReleaseGood> = trxMgr
    ? trxMgr.getRepository(ReleaseGood)
    : getRepository(ReleaseGood)
  const transportDriverRepo: Repository<TransportDriver> = trxMgr
    ? trxMgr.getRepository(TransportDriver)
    : getRepository(TransportDriver)
  const transportVehicleRepo: Repository<TransportVehicle> = trxMgr
    ? trxMgr.getRepository(TransportVehicle)
    : getRepository(TransportVehicle)

  if (!deliveryOrder) throw new Error(`No data is sent`)

  const foundRO: ReleaseGood = await releaseOrderRepo.findOne({
    where: { domain, name: deliveryOrder.releaseGood.name, status: ORDER_STATUS.LOADING },
    relations: ['bizplace']
  })
  const customerBizplace: Bizplace = foundRO.bizplace

  // 1. Create delivery order
  if (!foundRO) throw new Error('Release Order is not found')
  const createdDeliveryOrder: DeliveryOrder = await deliveryOrderRepo.save({
    ...deliveryOrder,
    domain,
    releaseGood: foundRO,
    bizplace: customerBizplace,
    transportDriver: await transportDriverRepo.findOne({
      where: { domain, name: deliveryOrder.transportDriver.name }
    }),
    transportVehicle: await transportVehicleRepo.findOne({
      where: { domain, name: deliveryOrder.transportVehicle.name }
    }),
    status: ORDER_STATUS.PENDING,
    creator: user,
    updater: user
  })

  return createdDeliveryOrder
}
