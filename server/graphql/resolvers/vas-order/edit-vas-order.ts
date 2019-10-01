import { getManager, getRepository, In } from 'typeorm'
import { ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderVas, Vas, VasOrder } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editVasOrder = {
  async editVasOrder(_: any, { name, vasOrder }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const foundVasOrder: VasOrder = await getRepository(VasOrder).findOne({
          where: {
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            name,
            status: ORDER_STATUS.EDITING
          }
        })

        // Validate for existing Order Vas
        if (!foundVasOrder) throw new Error("Vas order doesn't exists")

        const foundOrderVass: OrderVas[] = await getRepository(OrderVas).find({
          where: {
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            status: ORDER_STATUS.PENDING,
            vasOrder: foundVasOrder
          }
        })

        // 1. delete order vas
        await getRepository(OrderVas).delete({ id: In(foundOrderVass.map((ov: OrderVas) => ov.id)) })
        // 2. delete vas order
        await getRepository(VasOrder).delete({ ...foundVasOrder })

        const newVasOrder: VasOrder = vasOrder
        const newOrderVass: OrderVas[] = vasOrder.orderVass

        // Create vas order
        const createdVasOrder: VasOrder = await getRepository(VasOrder).save({
          name: OrderNoGenerator.vasOrder(),
          domain: context.state.domain,
          bizplace: context.state.mainBizplace,
          ...newVasOrder,
          creator: context.state.user,
          updater: context.state.user
        })

        // 2. Create arrival notice vas
        await Promise.all(
          newOrderVass.map(async (vas: OrderVas) => {
            await getRepository(OrderVas).save({
              ...vas,
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: OrderNoGenerator.releaseVas(),
              vas: await getRepository(Vas).findOne(vas.vas.id),
              vasOrder: createdVasOrder,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            })
          })
        )

        return createdVasOrder
      } catch (e) {
        throw e
      }
    })
  }
}
