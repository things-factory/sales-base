import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const updateProductOptionDetail = {
  async updateProductOptionDetail(_: any, { name, patch }, context: any) {
    const repository = getRepository(ProductOptionDetail)
    const productOptionDetail = await repository.findOne({
      where: { domain: context.domain, name }
    })

    return await repository.save({
      ...productOptionDetail,
      ...patch,
      updater: context.state.user
    })
  }
}
