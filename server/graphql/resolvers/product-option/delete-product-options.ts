import { getRepository, In } from 'typeorm'
import { ProductOption } from '../../../entities'

export const deleteProductOptions = {
  async deleteProductOptions(_: any, { names }) {
    await getRepository(ProductOption).delete({
      name: In(names)
    })

    return true
  }
}
