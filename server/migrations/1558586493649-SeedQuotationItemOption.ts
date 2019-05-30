import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { QuotationItemOption } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedQuotationItemOption1558586493649 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(QuotationItemOption)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async quotationItemOption => {
        await repository.save({
          ...quotationItemOption,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(QuotationItemOption)
    SEED.reverse().forEach(async quotationItemOption => {
      let record = await repository.findOne({ name: quotationItemOption.name })
      await repository.remove(record)
    })
  }
}
