import { getManager, getRepository } from 'typeorm'
import { ORDER_VAS_STATUS } from '../../../constants'
import { OrderVas, Vas, VasOrder } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateVasOrder = {
  async generateVasOrder(_: any, { vasOrder }, context: any) {
    return await getManager().transaction(async () => {
      const newVasOrder = vasOrder
      let orderVass = vasOrder.orderVass

      const createdVasOrder: VasOrder = await getRepository(VasOrder).save({
        name: OrderNoGenerator.vasOrder(),
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        ...newVasOrder,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create VasOrder vas
      orderVass = await Promise.all(
        orderVass.map(async (vas: OrderVas) => {
          return {
            ...vas,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            name: OrderNoGenerator.releaseVas(),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            vasOrder: createdVasOrder,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(orderVass)

      return createdVasOrder
    })
  }
}
