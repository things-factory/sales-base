import { getRepository } from 'typeorm'
import { OrderVas } from '../../../entities'

export const updateMultipleOrderVas = {
  async updateMultipleOrderVas(_: any, { patches }, context: any) {
    let results = []
    const _createRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === '+')
    const _updateRecords = patches.filter((patch: any) => patch.cuFlag.toUpperCase() === 'M')
    const orderVasRepo = getRepository(OrderVas)

    if (_createRecords.length > 0) {
      for (let i = 0; i < _createRecords.length; i++) {
        const newRecord = _createRecords[i]

        const result = await orderVasRepo.save({
          ...newRecord,
          domain: context.state.domain,
          creator: context.state.user,
          updater: context.state.user
        })

        results.push({ ...result, cuFlag: '+' })
      }
    }

    if (_updateRecords.length > 0) {
      for (let i = 0; i < _updateRecords.length; i++) {
        const newRecord = _updateRecords[i]
        const orderVas = await orderVasRepo.findOne(newRecord.id)

        const result = await orderVasRepo.save({
          ...orderVas,
          ...newRecord,
          updater: context.state.user
        })

        results.push({ ...result, cuFlag: 'M' })
      }
    }

    return results
  }
}
