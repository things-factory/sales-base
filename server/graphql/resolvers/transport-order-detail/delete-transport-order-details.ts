import { getRepository, In } from 'typeorm'
import { TransportOrderDetail } from '../../../entities'

export const deleteTransportOrderDetails = {
  async deleteTransportOrderDetails(_: any, { names }, context: any) {
    await getRepository(TransportOrderDetail).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

