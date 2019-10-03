import { getManager, getRepository, In } from 'typeorm'
import { ORDER_STATUS, ORDER_VAS_STATUS, ORDER_TYPES } from '../../../constants'
import { OrderVas, Vas, VasOrder } from '../../../entities'
import { Inventory } from '@things-factory/warehouse-base'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editVasOrder = {
  async editVasOrder(_: any, { name, vasOrder }, context: any) {
    return await getManager().transaction(async () => {
      let newOrderVass: OrderVas[] = vasOrder.orderVass

      let foundVasOrder: VasOrder = await getRepository(VasOrder).findOne({
        where: {
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          name,
          status: ORDER_STATUS.EDITING
        },
        relations: ['orderVass', 'creator', 'updater']
      })

      if (!foundVasOrder) throw new Error("Vas order doesn't exists")
      const foundOVs: OrderVas[] = await getRepository(OrderVas).find({
        where: {
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          status: ORDER_STATUS.PENDING,
          vasOrder: foundVasOrder
        }
      })

      // 2. delete order vass
      await getRepository(OrderVas).delete({ id: In(foundOVs.map((ov: OrderVas) => ov.id)) })

      // update release good
      const updatedVasOrder: VasOrder = await getRepository(VasOrder).save({
        ...foundVasOrder,
        ...vasOrder,
        status: ORDER_STATUS.PENDING,
        updater: context.state.user
      })

      newOrderVass = await Promise.all(
        newOrderVass.map(async (ov: OrderVas) => {
          return {
            ...ov,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(),
            vas: await getRepository(Vas).findOne({ domain: context.state.domain, id: ov.vas.id }),
            inventory: await getRepository(Inventory).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: ov.inventory.name
              }
            }),
            vasOrder: updatedVasOrder,
            bizplace: context.state.mainBizplace,
            type: ORDER_TYPES.RELEASE_OF_GOODS,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(newOrderVass)

      return updatedVasOrder
    })
  }
}
