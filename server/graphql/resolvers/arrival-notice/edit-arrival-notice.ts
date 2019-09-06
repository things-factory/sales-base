import { getManager, getRepository, In } from 'typeorm'
import { ArrivalNotice, ArrivalNoticeProduct, ArrivalNoticeVas, Product, Vas } from '../../../entities'
import { ORDER_STATUS } from '../../../enum'

export const editArrivalNotice = {
  async editArrivalNotice(_: any, { name, patch }, context: any) {
    const arrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
      where: { domain: context.state.domain, name },
      relations: ['arrivalNoticeProducts', 'arrivalNoticeVass', 'creator', 'updater']
    })

    try {
      if (arrivalNotice.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')
      if (!arrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

      return await getManager().transaction(async transactionalEntityManager => {
        // 1. delete arrival notice products
        const arrivalNoticeProductIds = arrivalNotice.arrivalNoticeProducts.map(product => product.id)
        await transactionalEntityManager.getRepository(ArrivalNoticeProduct).delete({ id: In(arrivalNoticeProductIds) })

        // 2. delete arrival notice vass
        const arrivalNoticeVasIds = arrivalNotice.arrivalNoticeVass.map(vas => vas.id)
        await transactionalEntityManager.getRepository(ArrivalNoticeVas).delete({ id: In(arrivalNoticeVasIds) })

        // 3. update arrival notice
        const updatedArrivalNotice: ArrivalNotice = await transactionalEntityManager.getRepository(ArrivalNotice).save({
          ...arrivalNotice,
          ...patch,
          updater: context.state.user
        })

        // 4. create arrival notice products
        const products = await Promise.all(
          patch.products.map(async (product: ArrivalNoticeProduct) => {
            return {
              ...product,
              domain: context.state.domain,
              name: `${updatedArrivalNotice.name}-${product.batchId}-${product.seq}`,
              product: await getRepository(Product).findOne(product.product.id),
              arrivalNotice: updatedArrivalNotice,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await transactionalEntityManager.getRepository(ArrivalNoticeProduct).save(products)

        // 5. create arrival notice products
        const vass = await Promise.all(
          patch.vass.map(async (vas: ArrivalNoticeVas) => {
            return {
              ...vas,
              domain: context.state.domain,
              name: `${updatedArrivalNotice.name}-${vas.batchId}-${vas.vas.name}`,
              vas: await getRepository(Vas).findOne(vas.vas.id),
              arrivalNotice: updatedArrivalNotice,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await transactionalEntityManager.getRepository(ArrivalNoticeVas).save(vass)

        return updatedArrivalNotice
      })
    } catch (e) {
      throw e
    }
  }
}
