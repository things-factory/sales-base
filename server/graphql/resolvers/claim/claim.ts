import { getRepository } from 'typeorm'
import { Claim } from '../../../entities'

export const claimResolver = {
  async claim(_: any, { id }, context: any) {
    var data = await getRepository(Claim).findOne({
      where: {
        domain: context.state.domain,
        id
      },
      relations: [
        'domain',
        'claimDetails',
        'claimOrders',
        'transportDriver',
        'transportVehicle',
        'bizplace',
        'creator',
        'updater'
      ]
    })

    return data
  }
}
