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
        'collectionOrder',
        'collectionOrder.bizplace',
        'collectionOrder.transportOrderDetails.transportDriver',
        'collectionOrder.transportOrderDetails.transportVehicle',
        'deliveryOrder',
        'deliveryOrder.bizplace',
        'deliveryOrder.transportOrderDetails.transportDriver',
        'deliveryOrder.transportOrderDetails.transportVehicle',
        'creator',
        'updater'
      ]
    })

    if (data.collectionOrder) {
      data['orderName'] = data.collectionOrder.name
      data['to'] = data.collectionOrder.bizplace.name
      data['from'] = data.collectionOrder.from
      data['transportDriverName'] = data.collectionOrder.transportOrderDetails
      data['transportVehicleName'] = data.collectionOrder.transportOrderDetails
      data['orderDate'] = data.collectionOrder.collectionDate
    } else if (data.deliveryOrder) {
      data['orderName'] = data.deliveryOrder.name
      data['to'] = data.deliveryOrder.to
      data['from'] = data.deliveryOrder.bizplace.name
      data['transportDriverName'] = data.deliveryOrder.transportOrderDetails
      data['transportVehicleName'] = data.deliveryOrder.transportOrderDetails
      data['orderDate'] = data.deliveryOrder.deliveryDate
    }

    return data
  }
}
