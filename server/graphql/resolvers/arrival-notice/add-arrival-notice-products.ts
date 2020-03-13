import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { Domain, sendNotification } from '@things-factory/shell'
import { EntityManager, getManager, getRepository, Repository } from 'typeorm'
import { ArrivalNotice, OrderProduct } from '../../../entities'
import { OrderNoGenerator } from '../../../utils'

export const addArrivalNoticeProductsResolver = {
  async addArrivalNoticeProducts(_: any, { ganNo, orderProducts }, context: any): Promise<void> {
    return await getManager().transaction(async (trxMgr: EntityManager) => {
      const arrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: { name: ganNo },
        relations: ['bizplace', 'orderProducts']
      })
      const customerBizplace: Bizplace = arrivalNotice.bizplace

      await addArrivalNoticeProducts(context.state.domain, arrivalNotice, orderProducts, context.state.user, trxMgr)

      // notification logics
      // get Customer by bizplace
      const users: any[] = await trxMgr
        .getRepository('bizplaces_users')
        .createQueryBuilder('bu')
        .select('bu.user_id', 'id')
        .where(qb => {
          const subQuery = qb
            .subQuery()
            .select('bizplace.id')
            .from(Bizplace, 'bizplace')
            .where('bizplace.name = :bizplaceName', { bizplaceName: customerBizplace.name })
            .getQuery()
          return 'bu.bizplace_id IN ' + subQuery
        })
        .getRawMany()

      // send notification to Customer Users
      if (users?.length) {
        const msg = {
          title: `Extra products are added for ${arrivalNotice.name}`,
          message: `Please approve extra products.`,
          url: context.header.referer
        }
        users.forEach(user => {
          sendNotification({
            receiver: user.id,
            message: JSON.stringify(msg)
          })
        })
      }
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

  orderProducts = await Promise.all(
    orderProducts.map(async (op: OrderProduct) => {
      return {
        ...op,
        domain,
        bizplace: arrivalNotice.bizplace,
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
