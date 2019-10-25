import { getManager, getRepository, In, MoreThan } from 'typeorm'
import { Claim, ClaimDetail, ClaimOrder, DeliveryOrder, CollectionOrder } from '../../../entities'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { Bizplace } from '@things-factory/biz-base'

export const createClaim = {
  async createClaim(_: any, { claim }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      let arrClaimOrdersName = claim.claimOrders.map(item => {
        return item.name
      })

      let newClaimOrders = []
      let deliveryOrder = await getRepository(DeliveryOrder).find({
        where: { name: In(arrClaimOrdersName), domain: context.state.domain }
      })

      let collectionOrder = await getRepository(CollectionOrder).find({
        where: { name: In(arrClaimOrdersName), domain: context.state.domain }
      })

      deliveryOrder.map(order => {
        newClaimOrders.push({
          name: order.name,
          deliveryOrder: order
        })
      })

      collectionOrder.map(order => {
        newClaimOrders.push({
          name: order.name,
          collectionOrder: order
        })
      })

      let bizplace = await getRepository(Bizplace).findOne({
        where: {
          domain: context.state.domain,
          id: claim.bizplace
        }
      })

      let transportDriver = await getRepository(TransportDriver).findOne({
        where: {
          domain: context.state.domain,
          id: claim.transportDriver
        }
      })

      let transportVehicle = await getRepository(TransportVehicle).findOne({
        where: {
          domain: context.state.domain,
          id: claim.transportVehicle
        }
      })

      // if (newClaimOrders.length > 0) {
      //   await getRepository(ClaimOrder).findAndCount({
      //     where: { deliveryOrder: In(), domain: context.state.domain }
      //   })
      //   throw new Error('Data Error')
      // }

      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth()
      let date = today.getDate()

      const [items, total] = await getRepository(Claim).findAndCount({
        createdAt: MoreThan(new Date(year, month, date))
      })

      let claimName =
        'CLAIM - ' +
        year.toString().substr(year.toString().length - 2) +
        ('0' + month.toString()).substr(('0' + month.toString()).toString().length - 2) +
        ('0' + date.toString()).substr(('0' + date.toString()).length - 2) +
        '/' +
        ('0000' + (total + 1).toString()).substr(('0000' + (total + 1).toString()).length - 4)

      // //Save All Data//
      const createdClaim: Claim = await transactionalEntityManager.getRepository(Claim).save({
        ...claim,
        name: claimName,
        bizplace: bizplace,
        transportDriver: transportDriver,
        transportVehicle: transportVehicle,
        domain: context.state.domain,
        creator: context.state.user,
        updater: context.state.user
      })

      const claimOrders = await Promise.all(
        newClaimOrders.map(async (ClaimOrder: ClaimOrder) => {
          return {
            ...ClaimOrder,
            claim: createdClaim,
            domain: context.state.domain,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )

      const claimDetails = await Promise.all(
        claim.claimDetails.map(async (ClaimDetail: ClaimDetail) => {
          return {
            ...ClaimDetail,
            claim: createdClaim,
            domain: context.state.domain,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )

      await transactionalEntityManager.getRepository(ClaimOrder).save(claimOrders)
      await transactionalEntityManager.getRepository(ClaimDetail).save(claimDetails)
      //Save All Data//

      return claim
    })
  }
}
