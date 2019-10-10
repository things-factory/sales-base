import { getRepository } from 'typeorm'
import { Claim } from '../../../entities'

export const claimResolver = {
  async claim(_: any, { id }, context: any) {
    const repository = getRepository(Claim)

    var data = await getRepository(Claim).findOne({
      where: {
        domain: context.state.domain,
        id
      },
      relations: [
        'domain',
        'claimDetails',
        'collectionOrder',
        'collectionOrder.bizplace',
        'collectionOrder.transportDriver',
        'collectionOrder.transportVehicle',
        'deliveryOrder',
        'deliveryOrder.bizplace',
        'deliveryOrder.transportDriver',
        'deliveryOrder.transportVehicle',
        'creator',
        'updater'
      ]
    })

    if (data.collectionOrder) {
      data['orderName'] = data.collectionOrder.name
      data['to'] = data.collectionOrder.bizplace.name
      data['from'] = data.collectionOrder.from
      data['transportDriverName'] = data.collectionOrder.transportDriver.name
      data['transportVehicleName'] = data.collectionOrder.transportVehicle.name
      data['orderDate'] = data.collectionOrder.collectionDate
    } else if (data.deliveryOrder) {
      data['orderName'] = data.deliveryOrder.name
      data['to'] = data.deliveryOrder.to
      data['from'] = data.deliveryOrder.bizplace.name
      data['transportDriverName'] = data.deliveryOrder.transportDriver.name
      data['transportVehicleName'] = data.deliveryOrder.transportVehicle.name
      data['orderDate'] = data.deliveryOrder.deliveryDate
    }

    return data
  }
}
