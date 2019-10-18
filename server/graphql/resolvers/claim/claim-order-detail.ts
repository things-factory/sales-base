import { Claim, DeliveryOrder, CollectionOrder } from '../../../entities'
import { Equal, getRepository, In, IsNull, Not } from 'typeorm'

export const claimOrderDetailResolver = {
  async claimOrderDetail(_: any, params: any, context: any) {
    let claim = new Claim()
    // let deliveryOrder = await getRepository(DeliveryOrder).findOne({
    //   where: {
    //     domain: context.state.domain,
    //     name: params.filters[0].value
    //   },
    //   relations: ['domain', 'bizplace', 'transportDriver', 'transportVehicle', 'creator', 'updater']
    // })

    // let collectionOrder = await getRepository(CollectionOrder).findOne({
    //   where: {
    //     domain: context.state.domain,
    //     name: params.filters[0].value
    //   },
    //   relations: ['domain', 'bizplace', 'transportDriver', 'transportVehicle', 'creator', 'updater']
    // })
    // var x = await getRepository(Claim).findOne({
    //   where: {
    //     domain: context.state.domain,
    //     deliveryOrder: 'DO-201992495155390'
    //   },
    //   relations: ['deliveryOrder']
    // })

    // claim.deliveryOrder = deliveryOrder
    // claim.collectionOrder = collectionOrder
    return claim
  }
}
