import { getManager, getRepository } from 'typeorm'
import { ReleaseGood, ShippingOrder, DeliveryOrder, OrderInventory, OrderVas } from '../../../entities'
import { ORDER_STATUS, ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS } from '../../../constants'

export const confirmReleaseGood = {
  async confirmReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      const foundReleaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
        where: { domain: context.state.domain, name, status: ORDER_STATUS.PENDING },
        relations: ['orderInventories', 'orderVass']
      })

      if (!foundReleaseGood) throw new Error(`Release good order doesn't exists.`)
      let foundOIs: OrderInventory[] = foundReleaseGood.orderInventories
      let foundOVs: OrderVas[] = foundReleaseGood.orderVass

      // 1. Update status of order inventories
      foundOIs = foundOIs.map((orderInventory: OrderInventory) => {
        return {
          ...orderInventory,
          status: ORDER_PRODUCT_STATUS.PENDING_RECEIVE,
          updater: context.state.user
        }
      })
      await getRepository(OrderInventory).save(foundOIs)

      // 2. Update status of order vass
      if (foundOVs && foundOVs.length) {
        foundOVs = foundOVs.map((orderVas: OrderVas) => {
          return {
            ...orderVas,
            status: ORDER_VAS_STATUS.PENDING_RECEIVE,
            updater: context.state.user
          }
        })
        await getRepository(OrderVas).save(foundOVs)
      }

      // 3. Release Goods Status change (PENDING => PENDING_RECEIVE)
      return await getRepository(ReleaseGood).save({
        ...foundReleaseGood,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })
    })
  }
}
