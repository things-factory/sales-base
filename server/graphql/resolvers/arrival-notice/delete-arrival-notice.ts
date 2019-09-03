import { getRepository } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const deleteArrivalNotice = {
  async deleteArrivalNotice(_: any, { name }) {
    await getRepository(ArrivalNotice).delete(name)
    return true
  }
}
