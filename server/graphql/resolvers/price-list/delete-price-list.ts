import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const deletePriceList = {
  async deletePriceList(_: any, { name }, context: any) {
    return await getRepository(PriceList).delete({ domain: context.domain, name })
  }
}
