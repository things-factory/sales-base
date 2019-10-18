import { getManager } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, OrderProduct, OrderVas } from '../../../entities'

export const confirmArrivalNotice = {
  async confirmArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: { domain: context.state.domain, name },
        relations: ['orderProducts', 'orderProducts.product', 'orderVass', 'orderVass.vas', 'creator', 'updater']
      })

      let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
      let foundOVs: OrderVas[] = foundArrivalNotice.orderVass

      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
      if (foundArrivalNotice.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. GAN Status change (PENDING => PENDING_RECEIVE)
      const arrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).save({
        ...foundArrivalNotice,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      foundOPs = foundOPs.map((op: OrderProduct) => {
        return { ...op, status: ORDER_PRODUCT_STATUS.PENDING_RECEIVE }
      })
      await trxMgr.getRepository(OrderProduct).save(foundOPs)

      // 2. Update order vas status if it exists.
      if (foundOVs && foundOVs.length) {
        foundOVs = foundOVs.map((ov: OrderVas) => {
          return { ...ov, status: ORDER_VAS_STATUS.PENDING_RECEIVE }
        })

        await trxMgr.getRepository(OrderVas).save(foundOVs)
      }
      return arrivalNotice
    })
  }
}
