import { getManager, In } from 'typeorm'
import { ArrivalNotice, OrderProduct, OrderVas, JobSheet } from '../../../entities'

export const deleteArrivalNotice = {
  async deleteArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      let foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: { domain: context.state.domain, name },
        relations: ['orderProducts', 'orderVass', 'collectionOrders', 'jobSheet', 'creator', 'updater']
      })

      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

      const foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
      const foundOVs: OrderVas[] = foundArrivalNotice.orderVass
      const foundJS: JobSheet = foundArrivalNotice.jobSheet

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

      await trxMgr.getRepository(ArrivalNotice).save({
        ...foundArrivalNotice,
        jobSheet: null,
        updater: context.state.user
      })

      // 3. delete Job Sheet
      await trxMgr.getRepository(JobSheet).delete({ domain: context.state.domain, id: foundJS.id })

      // 4. delete GAN
      await trxMgr.getRepository(ArrivalNotice).delete({ domain: context.state.domain, name })

      return true
    })
  }
}
