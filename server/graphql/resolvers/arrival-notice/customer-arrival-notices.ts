import { ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ArrivalNotice } from '../../../entities'

export const customerArrivalNoticesResolver = {
  async customerArrivalNotices(_: any, params: ListParam, context: any) {
    return await getRepository(ArrivalNotice).find({
      where: {
        domain: context.state.domain,
        bizplace: params.bizplace,
        status: In([ORDER_STATUS.READY_TO_PUTAWAY, ORDER_STATUS.PUTTING_AWAY])
      },
      relations: ['domain', 'bizplace', 'creator', 'updater']
    })
  }
}
