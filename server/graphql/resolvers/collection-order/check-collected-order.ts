import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { CollectionOrder } from '../../../entities'

export const checkCollectedOrder = {
  async checkCollectedOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name }
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.COLLECTING) throw new Error(`Status is not receivable.`)

        await getRepository(CollectionOrder).save({
          ...collectionOrder,
          ...patch,
          status: ORDER_STATUS.DONE,
          updater: context.state.user
        })

        return collectionOrder
      } catch (e) {
        throw e
      }
    })
  }
}
