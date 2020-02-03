import { User } from '@things-factory/auth-base'
import { Product } from '@things-factory/product-base'
import { Domain } from '@things-factory/shell'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { ORDER_PRODUCT_STATUS } from '../../../constants'
import { ArrivalNotice, OrderProduct } from '../../../entities'
import { OrderNoGenerator } from '../../../utils'

export const addArrivalNoticeProductsResolver = {
  async addArrivalNoticeProducts(_: any, { ganNo, orderProducts }, context: any): Promise<void> {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      const arrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: { name: ganNo },
        relations: ['bizplace', 'orderProducts']
      })

      return await addArrivalNoticeProducts(
        context.state.domain,
        arrivalNotice,
        orderProducts,
        context.state.user,
        trxMgr
      )
    })
  }
}

export async function addArrivalNoticeProducts(
  domain: Domain,
  arrivalNotice: ArrivalNotice,
  orderProducts: OrderProduct[],
  user: User,
  trxMgr?: EntityManager
): Promise<void> {
  const productRepo: Repository<Product> = trxMgr?.getRepository(Product) || getRepository(Product)
  const orderProductRepo: Repository<OrderProduct> = trxMgr?.getRepository(OrderProduct) || getRepository(OrderProduct)

  if (!arrivalNotice?.bizplace || !arrivalNotice?.orderProducts?.length) {
    arrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
      where: { ...arrivalNotice },
      relations: ['bizplace', 'orderProducts']
    })
  }

  const seq: number = arrivalNotice.orderProducts.length + 1

  orderProducts = await Promise.all(
    orderProducts.map(async (op: OrderProduct, idx: number) => {
      return {
        ...op,
        domain,
        bizplace: arrivalNotice.bizplace,
        seq: op.seq ? op.seq : seq + idx,
        name: OrderNoGenerator.orderProduct(),
        product: await productRepo.findOne({ domain, id: op.product.id }),
        arrivalNotice,
        creator: user,
        updater: user
      }
    })
  )

  await orderProductRepo.save(orderProducts)
}
