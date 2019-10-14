import { getRepository } from 'typeorm'
import { TransportOrderDetail } from '../../../entities'

export const deleteTransportOrderDetail = {
  async deleteTransportOrderDetail(_: any, { name }, context: any) {
    await getRepository(TransportOrderDetail).delete({ domain: context.state.domain, name })
    return true
  }
}

