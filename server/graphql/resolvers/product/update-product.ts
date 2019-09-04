import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const updateProduct = {
  async updateProduct(_: any, { name, patch }, context: any) {
    const product = await getRepository(Product).findOne({
      domain: context.state.domain,
      name,
      bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
    })
    return await getRepository(Product).save({
      ...product,
      ...patch,
      updater: context.state.user
    })
  }
}
