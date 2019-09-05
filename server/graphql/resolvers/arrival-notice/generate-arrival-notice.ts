import { getManager } from 'typeorm'
import { ArrivalNotice, ArrivalNoticeProduct, ArrivalNoticeVas } from '../../../entities'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { data }, context: any) {
    await getManager().transaction(async transactionalEntityManager => {
      const { arrivalNotice, products, vass } = data
      // create arrival notice product
      products.forEach((product: ArrivalNoticeProduct) => {
        product.domain = context.state.domain
        product.name = `${product.batchId}-${product.seq}-${product.product.name}`
        product.creator = context.state.user
        product.updater = context.state.user
      })
      const arrivalNoticeProducts: [ArrivalNoticeProduct] = await transactionalEntityManager
        .getRepository(ArrivalNoticeProduct)
        .save(products)

      // create arrival notice vas
      vass.forEach((vas: ArrivalNoticeVas) => {
        vas.domain = context.state.domain
        vas.name = `${vas.batchId}-${vas.vas.name}`
        vas.creator = context.state.user
        vas.updater = context.state.user
      })
      const arrivalNoticeVass: [ArrivalNoticeVas] = await transactionalEntityManager
        .getRepository(ArrivalNoticeVas)
        .save(vass)

      // create arrival notice
      const createdArrivalNotice: ArrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
        domain: context.state.domain,
        bizplace: context.state.bizplaces[0],
        ...arrivalNotice,
        arrivalNoticeProducts,
        arrivalNoticeVass,
        creator: context.state.user,
        updater: context.state.user
      })

      return createdArrivalNotice
    })
  }
}
