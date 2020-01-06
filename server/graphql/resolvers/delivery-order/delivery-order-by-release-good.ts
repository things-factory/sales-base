import { EntityManager, getRepository, Repository } from 'typeorm'
import { DeliveryOrder, OrderInventory, ReleaseGood } from '../../../entities'

export const deliveryOrderByReleaseGoodResolver = {
  async deliveryOrderByReleaseGood(_: any, { releaseGoodNo }) {
    const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: { name: releaseGoodNo }
    })

    return await deliveryOrderByReleaseGood(releaseGood)
  }
}

export async function deliveryOrderByReleaseGood(releaseGood: ReleaseGood, trxMgr?: EntityManager): Promise<any> {
  const doRepo: Repository<DeliveryOrder> = trxMgr?.getRepository(DeliveryOrder) || getRepository(DeliveryOrder)
  const oiRepo: Repository<OrderInventory> = trxMgr?.getRepository(OrderInventory) || getRepository(OrderInventory)

  let [items, total] = await doRepo.findAndCount({
    where: { releaseGood }
  })

  items = await Promise.all(
    items.map(async (deliveryOrder: DeliveryOrder) => {
      return {
        ...deliveryOrder,
        targetInventories: await oiRepo.find({
          where: { deliveryOrder },
          relations: [
            'domain',
            'bizplace',
            'releaseGood',
            'targetInventories',
            'transportDriver',
            'transportVehicle',
            'attachments',
            'creator',
            'updater'
          ]
        })
      }
    })
  )

  return {
    items,
    total
  }
}
