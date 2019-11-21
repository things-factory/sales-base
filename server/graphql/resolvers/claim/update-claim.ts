import { getRepository, getManager, In } from 'typeorm'
import { Claim, ClaimDetail, ClaimOrder, DeliveryOrder, CollectionOrder } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const updateClaim = {
  async updateClaim(_: any, { id, patch }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      try {
        const targetClaim: Claim = await getRepository(Claim).findOne({
          where: { domain: context.state.domain, id },
          relations: ['claimDetails', 'claimOrders', 'bizplace', 'updater']
        })
        if (!targetClaim) throw new Error('claim not exists')

        let bizplace = await getRepository(Bizplace).findOne({
          where: {
            domain: context.state.domain,
            id: patch.bizplace
          }
        })

        transactionalEntityManager.query(`
          DELETE FROM
            claim_orders
          WHERE
            claim_id = '${targetClaim.id}'
        `)
        transactionalEntityManager.query(`
          DELETE FROM
            claim_details
          WHERE
            claim_id = '${targetClaim.id}'
        `)

        let arrClaimOrdersName = patch.claimOrders.map(item => {
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

        debugger
        await transactionalEntityManager.getRepository(Claim).save({
          ...targetClaim,
          ...patch,
          bizplace: bizplace,
          updater: context.state.user
        })

        const claimOrders = await Promise.all(
          newClaimOrders.map(async (ClaimOrder: ClaimOrder) => {
            return {
              ...ClaimOrder,
              claim: targetClaim,
              domain: context.state.domain,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )

        const claimDetails = await Promise.all(
          patch.claimDetails.map(async (ClaimDetail: ClaimDetail) => {
            return {
              ...ClaimDetail,
              claim: targetClaim,
              domain: context.state.domain,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )

        await transactionalEntityManager.getRepository(ClaimOrder).save(claimOrders)
        await transactionalEntityManager.getRepository(ClaimDetail).save(claimDetails)

        return targetClaim
      } catch (e) {
        throw e
      }
    })
  }
}
