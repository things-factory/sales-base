import { getManager, In, EntityManager } from 'typeorm'
import { ArrivalNotice, OrderProduct, OrderVas, JobSheet, ReleaseGood } from '../../../entities'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'
import { deleteReleaseGood } from '../release-good/delete-release-good'

export const deleteArrivalNoticeResolver = {
  async deleteArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      return await deleteArrivalNotice(trxMgr, name, context)
    })
  }
}

export async function deleteArrivalNotice(trxMgr: EntityManager, name: string, context: any): Promise<boolean> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  let foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
    where: { domain, name },
    relations: ['releaseGood', 'orderProducts', 'orderVass', 'collectionOrders', 'jobSheet', 'creator', 'updater']
  })

  if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

  const foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
  const foundOVs: OrderVas[] = foundArrivalNotice.orderVass
  const foundJS: JobSheet = foundArrivalNotice.jobSheet

  // 1. delete order products
  const productIds = foundOPs.map((product: OrderProduct) => product.id)
  if (productIds.length) {
    await trxMgr.getRepository(OrderProduct).delete({ id: In(productIds) })
  }

  // 2. delete order vass
  const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
  if (vasIds.length) {
    await trxMgr.getRepository(OrderVas).delete({ id: In(vasIds) })
  }

  await trxMgr.getRepository(ArrivalNotice).save({
    ...foundArrivalNotice,
    jobSheet: null,
    updater: user
  })

  // 3. delete Job Sheet
  await trxMgr.getRepository(JobSheet).delete({ domain, id: foundJS.id })

  // 4. Remove relation with RO if it's cross docking
  if (foundArrivalNotice.crossDocking && foundArrivalNotice.releaseGood?.id) {
    let releaseGood: ReleaseGood = foundArrivalNotice.releaseGood
    releaseGood.arrivalNotice = null
    releaseGood = await trxMgr.getRepository(ReleaseGood).save(releaseGood)

    await trxMgr.getRepository(ArrivalNotice).delete({ domain, name })
    await deleteReleaseGood(trxMgr, releaseGood.name, context)
  } else {
    // 5. delete GAN
    await trxMgr.getRepository(ArrivalNotice).delete({ domain, name })
  }
  return true
}
