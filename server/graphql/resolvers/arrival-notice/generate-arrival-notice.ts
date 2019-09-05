import { getRepository, getManager } from 'typeorm'
import { ArrivalNotice, ArrivalNoticeProduct, ArrivalNoticeVas, Product, Vas } from '../../../entities'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { data }, context: any) {
    await getManager().transaction(async transactionalEntityManager => {
      const { arrivalNotice, products, vass } = data
      // create arrival notice product
      products.forEach((product: ArrivalNoticeProduct) => {
        product.name = `${product.batchId}-${product.seq}-${product.product.name}`
      })
      const arrivalNoticeProducts: [ArrivalNoticeProduct] = await getRepository(ArrivalNoticeProduct).save(products)

      // create arrival notice vas
      vass.forEach((vas: ArrivalNoticeVas) => {
        vas.name = `${vas.batchId}-${vas.vas.name}`
      })
      const arrivalNoticeVass: [ArrivalNoticeVas] = await getRepository(ArrivalNoticeVas).save(vass)

      // create arrival notice
      const createdArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).save({
        ...arrivalNotice,
        arrivalNoticeProducts,
        arrivalNoticeVass
      })

      return createdArrivalNotice
    })
  }
}
