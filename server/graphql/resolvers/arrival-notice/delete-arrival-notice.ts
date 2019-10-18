import { Attachment, deleteAttachment } from '@things-factory/attachment-base'
import { getManager, In } from 'typeorm'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'

export const deleteArrivalNotice = {
  async deleteArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      let foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: { domain: context.state.domain, name },
        relations: ['orderProducts', 'orderVass', 'collectionOrders', 'creator', 'updater']
      })

      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

      const foundCOs: CollectionOrder[] = foundArrivalNotice.collectionOrders
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

      // 3. if there is CO, delete CO
      if (foundCOs) {
        const coIds = foundCOs.map((co: CollectionOrder) => co.id)
        if (coIds.length) {
          await trxMgr.getRepository(CollectionOrder).delete({ id: In(coIds) })

          // 4. if there is CO, delete attachment
          const foundAttachment: Attachment = await trxMgr.getRepository(Attachment).findOne({
            where: { domain: context.state.domain, refBy: In(coIds) }
          })
          await deleteAttachment(_, { id: foundAttachment.id }, context)
        }
      }

      // 4. delete GAN
      await trxMgr.getRepository(ArrivalNotice).delete({ domain: context.state.domain, name })

      return true
    })
  }
}
