import { Product } from '@things-factory/product-base'
import { getManager, getRepository } from 'typeorm'
import { OrderProduct, OrderVas, ReleaseGood, Vas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateReleaseGood = {
  async generateReleaseGood(_: any, { releaseGood }, context: any) {
    return await getManager().transaction(async () => {
      const newReleaseGood = releaseGood.releaseGood
      let products = releaseGood.products
      let vass = releaseGood.vass

      // 1. Create release good
      const createdReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
        name: OrderNoGenerator.releaseGood(),
        domain: context.state.domain,
        bizplace: context.state.bizplaces[0], // TODO: set main bizplace
        ...newReleaseGood,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create release good product
      products = await Promise.all(
        products.map(async (product: OrderProduct) => {
          return {
            ...product,
            domain: context.state.domain,
            name: OrderNoGenerator.orderProduct(createdReleaseGood.name, product.batchId, product.seq),
            product: await getRepository(Product).findOne(product.product.id),
            releaseGood: createdReleaseGood,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderProduct).save(products)

      // 3. Create arrival notice vas
      vass = await Promise.all(
        vass.map(async (vas: OrderVas) => {
          return {
            ...vas,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(createdReleaseGood.name, vas.batchId, vas.vas.name),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            releaseGood: createdReleaseGood,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await getRepository(OrderVas).save(vass)

      return createdReleaseGood
    })
  }
}
