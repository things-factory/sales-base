import { Product } from '@things-factory/product-base'
import { getManager, getRepository, In } from 'typeorm'
import { OrderProduct, OrderVas, ReleaseGood, Vas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../enum'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editReleaseGood = {
  async editReleaseGood(_: any, { name, releaseGood }, context: any) {
    const foundReleaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderVass', 'creator', 'updater']
    })

    try {
      if (!foundReleaseGood) throw new Error(`Release good doesn't exists.`)
      if (foundReleaseGood.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async () => {
        // 1. delete order products
        const orderProductIds = foundReleaseGood.orderProducts.map(product => product.id)
        await getRepository(OrderProduct).delete({ id: In(orderProductIds) })

        // 2. delete order vass
        const orderVasIds = foundReleaseGood.orderVass.map(vas => vas.id)
        await getRepository(OrderVas).delete({ id: In(orderVasIds) })

        // 3. update arrival notice
        const updatedReleaseGood: ReleaseGood = await getRepository(ReleaseGood).save({
          ...foundReleaseGood,
          ...releaseGood.releaseGood,
          updater: context.state.user
        })

        // 4. create order products
        const products = await Promise.all(
          releaseGood.products.map(async (product: OrderProduct) => {
            return {
              ...product,
              domain: context.state.domain,
              name: OrderNoGenerator.orderProduct(foundReleaseGood.name, product.batchId, product.seq),
              product: await getRepository(Product).findOne(product.product.id),
              releaseGood: updatedReleaseGood,
              status: ORDER_PRODUCT_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderProduct).save(products)

        // 5. create order vas
        const vass = await Promise.all(
          releaseGood.vass.map(async (vas: OrderVas) => {
            return {
              ...vas,
              domain: context.state.domain,
              name: OrderNoGenerator.orderVas(foundReleaseGood.name, vas.batchId, vas.vas.name),
              vas: await getRepository(Vas).findOne(vas.vas.id),
              arrivalNotice: updatedReleaseGood,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await getRepository(OrderVas).save(vass)

        return updatedReleaseGood
      })
    } catch (e) {
      throw e
    }
  }
}
