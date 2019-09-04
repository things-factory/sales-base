import { Bizplace } from '@things-factory/biz-base'
import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const updateMultipleProduct = {
  async updateMultipleProduct(_: any, { patches }, context: any) {
    let results = []
    const _createRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === '+')
    const _updateRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === 'M')
    const productRepo = getRepository(Product)

    if (_createRecords.length > 0) {
      for (let i = 0; i < _createRecords.length; i++) {
        const newRecord = _createRecords[i]

        if (newRecord.bizplace && newRecord.bizplace.id) {
          newRecord.bizplace = await getRepository(Bizplace).findOne(newRecord.bizplace.id)
        } else {
          newRecord.bizplace = context.state.bizplaces[0]
        }

        const result = await productRepo.save({
          domain: context.state.domain,
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
        const product = await productRepo.findOne(newRecord.id)

        if (newRecord.bizplace && newRecord.bizplace.id) {
          newRecord.bizplace = await getRepository(Bizplace).findOne(newRecord.bizplace.id)
        }

        const result = await productRepo.save({
          ...product,
          ...newRecord,
          updater: context.state.user
        })

        results.push({ ...result, cuFlag: 'M' })
      }
    }

    return results
  }
}
