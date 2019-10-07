import { getRepository, In } from 'typeorm'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'
import { Attachment, deleteAttachment } from '@things-factory/attachment-base'

export const deleteArrivalNotice = {
  async deleteArrivalNotice(_: any, { name }, context: any) {
    let foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderVass', 'collectionOrder', 'creator', 'updater']
    })

    if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
    const foundCO: CollectionOrder = foundArrivalNotice.collectionOrder
    const foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
    const foundOVs: OrderVas[] = foundArrivalNotice.orderVass

    // 1. delete order products
    const productIds = foundOPs.map((product: OrderProduct) => product.id)
    if (productIds.length) {
      await getRepository(OrderProduct).delete({ id: In(productIds) })
    }

    // 2. delete order vass
    const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
    if (vasIds.length) {
      await getRepository(OrderVas).delete({ id: In(vasIds) })
    }

    // 3. if there is CO, delete CO
    if (foundCO) {
      foundArrivalNotice = await getRepository(ArrivalNotice).save({ ...foundArrivalNotice, collectionOrder: null })
      await getRepository(CollectionOrder).delete({ id: foundCO.id })

      // 4. if there is CO, delete attachment
      const foundAttachment: Attachment = await getRepository(Attachment).findOne({
        where: { domain: context.state.domain, refBy: foundCO.id }
      })
      await deleteAttachment(_, { id: foundAttachment.id }, context)
    }

    // 4. delete GAN
    await getRepository(ArrivalNotice).delete(name)

    return true
  }
}
