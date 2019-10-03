import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrderResolver = {
  async deliveryOrder(_: any, { name }, context: any) {
    return await getRepository(DeliveryOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: ['domain', 'bizplace', 'transportDriver', 'transportVehicle', 'creator', 'updater']
    })
  }
}
