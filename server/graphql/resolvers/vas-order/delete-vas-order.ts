import { getRepository, In } from 'typeorm'
import { VasOrder, OrderVas } from '../../../entities'

export const deleteVasOrder = {
  async deleteVasOrder(_: any, { name }, context: any) {
    let foundVasOrder: VasOrder = await getRepository(VasOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderVass', 'creator', 'updater']
    })

    if (!foundVasOrder) throw new Error(`Vas order doesn't exists.`)
    const foundOVs: OrderVas[] = foundVasOrder.orderVass

    // 1. delete order vass
    const vasIds = foundOVs.map((vas: OrderVas) => vas.id)
    if (vasIds.length) {
      await getRepository(OrderVas).delete({ id: In(vasIds) })
    }

    await getRepository(VasOrder).delete({ domain: context.state.domain, name })
    return true
  }
}
