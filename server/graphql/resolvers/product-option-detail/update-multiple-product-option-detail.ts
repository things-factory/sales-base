import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'
import { Bizplace, getUserBizplaces } from '@things-factory/biz-base'

export const updateMultipleProductOptionDetail = {
  async updateMultipleProductOptionDetail(_: any, { patches }, context: any) {
    let results = []
    const _createRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === '+')
    const _updateRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === 'M')
    const productOptionDetailRepo = getRepository(ProductOptionDetail)

    if (_createRecords.length > 0) {
      for (let i = 0; i < _createRecords.length; i++) {
        const newRecord = _createRecords[i]

        if (newRecord.bizplace && newRecord.bizplace.id) {
          newRecord.bizplace = getRepository(Bizplace).findOne(newRecord.bizplace.id)
        } else {
          const userBizplaces = await getUserBizplaces(context)
          newRecord.bizplace = userBizplaces[0]
        }

        const result = await productOptionDetailRepo.save({
          domain: context.domain,
          creator: context.state.user,
          updater: context.state.user,
          ...newRecord
        })

        results.push({ ...result, cuFlag: '+' })
      }
    }

    if (_updateRecords.length > 0) {
      for (let i = 0; i < _updateRecords.length; i++) {
        const newRecord = _updateRecords[i]
        const productOptionDetail = await productOptionDetailRepo.findOne(newRecord.id)

        if (newRecord.bizplace && newRecord.bizplace.id) {
          newRecord.bizplace = getRepository(Bizplace).findOne(newRecord.bizplace.id)
        }

        const result = await productOptionDetailRepo.save({
          ...productOptionDetail,
          ...newRecord,
          updater: context.state.user
        })

        results.push({ ...result, cuFlag: 'M' })
      }
    }

    return results
  }
}
