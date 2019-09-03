import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'
import { Bizplace, getUserBizplaces } from '@things-factory/biz-base'

export const updateMultipleProductOption = {
  async updateMultipleProductOption(_: any, { patches }, context: any) {
    let results = []
    const _createRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === '+')
    const _updateRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === 'M')
    const productOptionRepo = getRepository(ProductOption)

    if (_createRecords.length > 0) {
      for (let i = 0; i < _createRecords.length; i++) {
        const newRecord = _createRecords[i]

        if (newRecord.bizplace && newRecord.bizplace.id) {
          newRecord.bizplace = getRepository(Bizplace).findOne(newRecord.bizplace.id)
        } else {
          const userBizplaces = await getUserBizplaces(context)
          newRecord.bizplace = userBizplaces[0]
        }

        const result = await productOptionRepo.save({
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
        const productOption = await productOptionRepo.findOne(newRecord.id)

        if (newRecord.bizplace && newRecord.bizplace.id) {
          newRecord.bizplace = getRepository(Bizplace).findOne(newRecord.bizplace.id)
        }

        const result = await productOptionRepo.save({
          ...productOption,
          ...newRecord,
          updater: context.state.user
        })

        results.push({ ...result, cuFlag: 'M' })
      }
    }

    return results
  }
}
