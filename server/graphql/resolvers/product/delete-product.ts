import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const deleteProduct = {
  async deleteProduct(_: any, { name }, context: any) {
    await getRepository(Product).delete({
      name,
      bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
    })
  }
}
