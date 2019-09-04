import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const deleteProducts = {
  async deleteProducts(_: any, { names }, context: any) {
    await getRepository(Product).delete({
      name: In(names),
      bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
    })

    return true
  }
}
