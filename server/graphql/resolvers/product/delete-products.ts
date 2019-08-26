import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const deleteProducts = {
  async deleteCompanies(_: any, { names }) {
    await getRepository(Product).delete({
      name: In(names)
    })

    return true
  }
}
