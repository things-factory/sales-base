import { getManager } from 'typeorm'
import { ORDER_INVENTORY_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderInventory, OrderVas, ReleaseGood } from '../../../entities'

export const confirmReleaseGood = {
  async confirmReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const foundReleaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).findOne({
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
          status: ORDER_INVENTORY_STATUS.PENDING_RECEIVE,
          updater: context.state.user
        }
      })
      await trxMgr.getRepository(OrderInventory).save(foundOIs)

      // 2. Update status of order vass
      if (foundOVs && foundOVs.length) {
        foundOVs = foundOVs.map((orderVas: OrderVas) => {
          return {
            ...orderVas,
            status: ORDER_VAS_STATUS.PENDING_RECEIVE,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(OrderVas).save(foundOVs)
      }

      // 3. Release Goods Status change (PENDING => PENDING_RECEIVE)
      return await trxMgr.getRepository(ReleaseGood).save({
        ...foundReleaseGood,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })
    })
  }
}
