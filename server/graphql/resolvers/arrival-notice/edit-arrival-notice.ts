import { Product } from '@things-factory/product-base'
import { getManager, getRepository, In } from 'typeorm'
import { ArrivalNotice, OrderProduct, OrderVas, Vas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const editArrivalNotice = {
  async editArrivalNotice(_: any, { name, arrivalNotice }, context: any) {
    const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderVass', 'creator', 'updater']
    })

    try {
      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
      if (foundArrivalNotice.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async transactionalEntityManager => {
        // 1. delete order products
        const orderProductIds = foundArrivalNotice.orderProducts.map(product => product.id)
        await transactionalEntityManager.getRepository(OrderProduct).delete({ id: In(orderProductIds) })

        // 2. delete order vass
        const orderVasIds = foundArrivalNotice.orderVass.map(vas => vas.id)
        await transactionalEntityManager.getRepository(OrderVas).delete({ id: In(orderVasIds) })

        // 3. update arrival notice
        const updatedArrivalNotice: ArrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
          ...foundArrivalNotice,
          ...arrivalNotice.arrivalNotice,
          updater: context.state.user
        })

        // 4. create order products
        const products = await Promise.all(
          arrivalNotice.products.map(async (product: OrderProduct) => {
            return {
              ...product,
              domain: context.state.domain,
              name: OrderNoGenerator.orderProduct(),
              product: await getRepository(Product).findOne(product.product.id),
              arrivalNotice: updatedArrivalNotice,
              bizplace: context.state.mainBizplace,
              status: ORDER_PRODUCT_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await transactionalEntityManager.getRepository(OrderProduct).save(products)

        // 5. create order vas
        const vass = await Promise.all(
          arrivalNotice.vass.map(async (vas: OrderVas) => {
            return {
              ...vas,
              domain: context.state.domain,
              name: OrderNoGenerator.orderVas(),
              vas: await getRepository(Vas).findOne(vas.vas.id),
              arrivalNotice: updatedArrivalNotice,
              bizplace: context.state.mainBizplace,
              status: ORDER_VAS_STATUS.PENDING,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await transactionalEntityManager.getRepository(OrderVas).save(vass)

        return updatedArrivalNotice
      })
    } catch (e) {
      throw e
    }
  }
}
