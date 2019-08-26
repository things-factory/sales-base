import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const deleteProducts = {
  async deleteProducts(_: any, { names }) {
    await getRepository(Product).delete({
      name: In(names)
    })

    return true
  }
}
