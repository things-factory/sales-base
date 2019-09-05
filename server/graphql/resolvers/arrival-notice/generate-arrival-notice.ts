import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice, ArrivalNoticeProduct, ArrivalNoticeVas } from '../../../entities'
import { createArrivalNotice } from './create-arrival-notice'
import { create } from 'domain'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { arrivalNotice }, context: any) {
    await getManager().transaction(async transactionalEntityManager => {
      const newArrivalNotice = arrivalNotice.arrivalNotice
      const products = arrivalNotice.products
      const vass = arrivalNotice.vass

      // 1. Create arrival notice
      const createdArrivalNotice: ArrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
        domain: context.state.domain,
        bizplace: context.state.bizplaces[0],
        ...newArrivalNotice,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create arrival notice product
      products.forEach((product: ArrivalNoticeProduct) => {
        product.domain = context.state.domain
        product.name = `${product.batchId}-${product.seq}-${product.product.name}`
        product.creator = context.state.user
        product.updater = context.state.user
        product.arrivalNotice = createdArrivalNotice
      })
      await transactionalEntityManager.getRepository(ArrivalNoticeProduct).save(products)

      // 3. Create arrival notice vas
      vass.forEach((vas: ArrivalNoticeVas) => {
        vas.domain = context.state.domain
        vas.name = `${vas.batchId}-${vas.vas.name}`
        vas.creator = context.state.user
        vas.updater = context.state.user
        vas.arrivalNotice = createdArrivalNotice
      })
      await transactionalEntityManager.getRepository(ArrivalNoticeVas).save(vass)

      return createdArrivalNotice
    })
  }
}
