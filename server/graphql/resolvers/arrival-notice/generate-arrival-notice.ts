import { getManager, getRepository } from 'typeorm'
import uuid from 'uuid/v4'
import { ArrivalNotice, ArrivalNoticeProduct, ArrivalNoticeVas, Product, Vas } from '../../../entities'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { arrivalNotice }, context: any) {
    await getManager().transaction(async transactionalEntityManager => {
      const newArrivalNotice = arrivalNotice.arrivalNotice
      let products = arrivalNotice.products
      let vass = arrivalNotice.vass

      // 1. Create arrival notice
      const createdArrivalNotice: ArrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
        name: uuid(),
        domain: context.state.domain,
        bizplace: context.state.bizplaces[0],
        ...newArrivalNotice,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create arrival notice product
      products = await Promise.all(
        products.map(async (product: ArrivalNoticeProduct) => {
          return {
            ...product,
            domain: context.state.domain,
            name: `${createdArrivalNotice.id}-${product.batchId}-${product.seq}`,
            product: await getRepository(Product).findOne(product.product.id),
            arrivalNotice: createdArrivalNotice,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await transactionalEntityManager.getRepository(ArrivalNoticeProduct).save(products)

      // 3. Create arrival notice vas
      vass = await Promise.all(
        vass.map(async (vas: ArrivalNoticeVas) => {
          return {
            ...vas,
            domain: context.state.domain,
            name: `${createdArrivalNotice.id}-${vas.batchId}-${vas.vas.name}`,
            vas: await getRepository(Vas).findOne(vas.vas.id),
            arrivalNotice: createdArrivalNotice,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await transactionalEntityManager.getRepository(ArrivalNoticeVas).save(vass)

      return createdArrivalNotice
    })
  }
}
