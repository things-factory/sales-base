import { getManager, getRepository } from 'typeorm'
import { Claim, ClaimDetail, DeliveryOrder, CollectionOrder } from '../../../entities'

export const createClaim = {
  async createClaim(_: any, { claim }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      let claimDetails = claim.claimDetails

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
            domain: context.state.domain,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await transactionalEntityManager.getRepository(ClaimDetail).save(claimDetails)

      return claim
    })
  }
}
