import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const updateDeliveryOrder = {
  async updateDeliveryOrder(_: any, { name, patch }, context: any) {
    const repository = getRepository(DeliveryOrder)
    const deliveryOrder = await repository.findOne({
      where: { domain: context.domain, name }
    })

    return await repository.save({
      ...deliveryOrder,
      ...patch,
      updaterId: context.state.user.id
    })
  }
}
