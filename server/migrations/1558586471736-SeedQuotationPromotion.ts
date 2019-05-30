import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { QuotationPromotion } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedQuotationPromotion1558586471736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(QuotationPromotion)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async quotationPromotion => {
        await repository.save({
          ...quotationPromotion,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(QuotationPromotion)
    SEED.reverse().forEach(async quotationPromotion => {
      let record = await repository.findOne({ name: quotationPromotion.name })
      await repository.remove(record)
    })
  }
}
