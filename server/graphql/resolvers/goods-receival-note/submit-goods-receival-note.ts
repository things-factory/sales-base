import { getManager } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { sendNotification } from '@things-factory/shell'
import { Bizplace } from '@things-factory/biz-base'
import { GRN_STATUS } from '../../../constants'
import { Attachment, createAttachment, deleteAttachment } from '@things-factory/attachment-base'

export const submitGoodsReceivalNote = {
  async submitGoodsReceivalNote(_: any, { name, file }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const foundGRN: GoodsReceivalNote = await trxMgr.getRepository(GoodsReceivalNote).findOne({
        where: { domain: context.state.domain, name },
        relations: ['bizplace']
      })

      if (!foundGRN) throw new Error(`GRN doesn't exists.`)
      let customerBizplace = foundGRN.bizplace

      const foundAttachment: Attachment = await trxMgr.getRepository(Attachment).findOne({
        where: { domain: context.state.domain, refBy: foundGRN.id }
      })

      const attachment = {
        refBy: foundGRN.id,
        file: file,
        category: 'GRN'
      }

      if (!foundAttachment) {
        await createAttachment(_, { attachment }, context)
      } else {
        const id = foundAttachment.id
        await deleteAttachment(_, { id }, context)
        await createAttachment(_, { attachment }, context)
      }

      // notification logics
      // get Customer by bizplace
      const users: any[] = await trxMgr
        .getRepository('bizplaces_users')
        .createQueryBuilder('bu')
        .select('bu.user_id', 'id')
        .where(qb => {
          const subQuery = qb
            .subQuery()
            .select('bizplace.id')
            .from(Bizplace, 'bizplace')
            .where('bizplace.name = :bizplaceName', { bizplaceName: customerBizplace.name })
            .getQuery()
          return 'bu.bizplace_id IN ' + subQuery
        })
        .getRawMany()

      // send notification to Customer Users
      if (users?.length) {
        const msg = {
          title: `New Incoming GRN`,
          message: `You have new GRN from ${context.state.domain}`,
          url: context.header.referer
        }
        users.forEach(user => {
          sendNotification({
            receiver: user.id,
            message: JSON.stringify(msg)
          })
        })
      }

      return await trxMgr.getRepository(GoodsReceivalNote).save({
        ...foundGRN,
        status: GRN_STATUS.SUBMITTED,
        updater: context.state.user
      })
    })
  }
}
