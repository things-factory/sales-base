import { getRepository, In } from 'typeorm'
import { VasOrder, OrderVas, Vas } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'
import { Inventory } from '@things-factory/warehouse-base'
export const vasOrderResolver = {
  async vasOrder(_: any, { name }, context: any) {
    const vasOrder: VasOrder = await getRepository(VasOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: [
        'domain',
        'bizplace',
        'orderVass',
        'orderVass.vas',
        'orderVass.inventory',
        'orderVass.inventory.product',
        'orderVass.inventory.location',
        'creator',
        'updater'
      ]
    })

    return {
      ...vasOrder,
      inventoryDetail: vasOrder.orderVass.map((orderVas: OrderVas) => {
        const inventory: Inventory = orderVas.inventory
        const vas: Vas = orderVas.vas
        return {
          vas: vas,
          batchId: inventory.batchId,
          product: inventory.product,
          inventoryName: inventory.name,
          location: inventory.location
        }
      })
    }
  }
}
