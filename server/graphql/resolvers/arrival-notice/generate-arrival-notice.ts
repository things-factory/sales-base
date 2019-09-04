import { getRepository, getManager } from 'typeorm'
import { ArrivalNotice, ArrivalNoticeProduct, ArrivalNoticeVas, Product, Vas } from '../../../entities'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { arrivalNotice }, context: any) {
    await getManager().transaction(async transactionalEntityManager => {
      // create arrival notice proeucts
      arrivalNotice.forEach(async (product: ArrivalNoticeProduct) => {
        product.product = await getRepository(Product).findOne(product.product.id)
      })
      await getRepository(ArrivalNoticeProduct).save(arrivalNotice.products)

      // create arrival notice vass
      arrivalNotice.vass.forEach(async (vas: ArrivalNoticeVas) => {
        vas.vas = await getRepository(Vas).findOne(vas.vas.id)
      })
      await getRepository(ArrivalNoticeVas).save(arrivalNotice.vass)

      // create arrival notice
      await getRepository(ArrivalNotice).save(arrivalNotice.arrivalNotice)
    })
  }
}
