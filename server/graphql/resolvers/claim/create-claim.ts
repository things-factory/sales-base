import { getManager, getRepository } from 'typeorm'
import { Claim, ClaimDetail, DeliveryOrder, CollectionOrder } from '../../../entities'

export const createClaim = {
  async createClaim(_: any, { claim }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      let claimDetails = claim.claimDetails

      let existingClaim = await getRepository(Claim).findOne({
        where: {
          domain: context.state.domain,
          name: claim.name
        }
      })

      let deliveryOrder = await getRepository(DeliveryOrder).findOne({
        where: {
          domain: context.state.domain,
          name: claim.name
        }
      })

      let collectionOrder = await getRepository(CollectionOrder).findOne({
        where: {
          domain: context.state.domain,
          name: claim.name
        }
      })

      //// Simple validation to check
      // 1. Must have claim details
      // 2. Must have either delivery order data or collection order data but not both.
      // 3. Claim must not exist per order.
      if (
        claimDetails.length == 0 ||
        (!deliveryOrder && !collectionOrder) ||
        (deliveryOrder && collectionOrder) ||
        existingClaim
      ) {
        throw new Error('Data Error')
      }

      //Save All Data//
      const createdClaim: Claim = await transactionalEntityManager.getRepository(Claim).save({
        ...claim,
        collectionOrder: collectionOrder,
        deliveryOrder: deliveryOrder,
        domain: context.state.domain,
        creator: context.state.user,
        updater: context.state.user
      })

      claimDetails = await Promise.all(
        claimDetails.map(async (ClaimDetail: ClaimDetail) => {
          return {
            ...ClaimDetail,
            claim: createdClaim,
            domain: context.state.domain,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await transactionalEntityManager.getRepository(ClaimDetail).save(claimDetails)
      //Save All Data//

      return claim
    })
  }
}
