import { getRepository, In } from 'typeorm'
import { Vas } from '../../../entities'

export const deleteVass = {
  async deleteProducts(_: any, { names }) {
    await getRepository(Vas).delete({
      name: In(names)
    })

    return true
  }
}
