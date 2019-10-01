import { getManager, getRepository } from 'typeorm'
import { VasOrder } from '../../../entities'
import { ORDER_STATUS } from '../../../constants'

export const confirmVasOrder = {
  async confirmVasOrder(_: any, { name }, context: any) {
    const foundVasOrder: VasOrder = await getRepository(VasOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderVass', 'orderVass.vas', 'creator', 'updater']
    })

    return await getManager().transaction(async () => {
      let vasOrder: VasOrder
      if (!foundVasOrder) throw new Error(`Vas order doesn't exists.`)
      if (foundVasOrder.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. Vas Order Status change (PENDING => PENDING_RECEIVE)
      vasOrder = await getRepository(VasOrder).save({
        ...foundVasOrder,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      return vasOrder
    })
  }
}
