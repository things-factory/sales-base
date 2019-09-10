import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice, OrderProduct, OrderVas, Product, Vas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const generateArrivalNotice = {
  async generateArrivalNotice(_: any, { arrivalNotice }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      const newArrivalNotice = arrivalNotice.arrivalNotice
      let products = arrivalNotice.products
      let vass = arrivalNotice.vass

      // 1. Create arrival notice
      const createdArrivalNotice: ArrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
        name: OrderNoGenerator.arrivalNotice(),
        domain: context.state.domain,
        bizplace: context.state.bizplaces[0],
        ...newArrivalNotice,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create arrival notice product
      products = await Promise.all(
        products.map(async (product: OrderProduct) => {
          return {
            ...product,
            domain: context.state.domain,
            name: OrderNoGenerator.orderProduct(createdArrivalNotice.name, product.batchId, product.seq),
            product: await getRepository(Product).findOne(product.product.id),
            arrivalNotice: createdArrivalNotice,
            status: ORDER_PRODUCT_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await transactionalEntityManager.getRepository(OrderProduct).save(products)

      // 3. Create arrival notice vas
      vass = await Promise.all(
        vass.map(async (vas: OrderVas) => {
          return {
            ...vas,
            domain: context.state.domain,
            name: OrderNoGenerator.orderVas(createdArrivalNotice.name, vas.batchId, vas.vas.name),
            vas: await getRepository(Vas).findOne(vas.vas.id),
            arrivalNotice: createdArrivalNotice,
            status: ORDER_VAS_STATUS.PENDING,
            creator: context.state.user,
            updater: context.state.user
          }
        })
      )
      await transactionalEntityManager.getRepository(OrderVas).save(vass)

      return createdArrivalNotice
    })
  }
}
