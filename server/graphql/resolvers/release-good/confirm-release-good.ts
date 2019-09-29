import { getManager, getRepository } from 'typeorm'
import { ReleaseGood } from '../../../entities'
import { ORDER_STATUS } from '../../../constants'

export const confirmReleaseGood = {
  async confirmReleaseGood(_: any, { name }, context: any) {
    const foundReleaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderInventories', 'orderInventories.inventory', 'orderVass', 'orderVass.vas', 'creator', 'updater']
    })

    return await getManager().transaction(async () => {
      let releaseGood: ReleaseGood
      if (!foundReleaseGood) throw new Error(`Release good order doesn't exists.`)
      if (foundReleaseGood.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. Release Goods Status change (PENDING => PENDING_RECEIVE)
      releaseGood = await getRepository(ReleaseGood).save({
        ...foundReleaseGood,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      return releaseGood
    })
  }
}
