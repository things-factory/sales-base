import { getManager, In } from 'typeorm'
import { ArrivalNotice, OrderProduct, OrderVas } from '../../../entities'

export const deleteArrivalNotice = {
  async deleteArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      let foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: { domain: context.state.domain, name },
        relations: ['orderProducts', 'orderVass', 'collectionOrders', 'creator', 'updater']
      })

      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

      const foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
      const foundOVs: OrderVas[] = foundArrivalNotice.orderVass

      // 1. delete order products
      const productIds = foundOPs.map((product: OrderProduct) => product.id)
      if (productIds.length) {
        await trxMgr.getRepository(OrderProduct).delete({ id: In(productIds) })
      }

      // 2. delete order vass
      const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
      if (vasIds.length) {
        await trxMgr.getRepository(OrderVas).delete({ id: In(vasIds) })
      }

      // 4. delete GAN
      await trxMgr.getRepository(ArrivalNotice).delete({ domain: context.state.domain, name })

      return true
    })
  }
}
