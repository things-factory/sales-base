import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { QuotationItem } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedQuotationItem1558586449247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(QuotationItem)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async quotationItem => {
        await repository.save({
          ...quotationItem,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // TODO implement me
    // const repository = getRepository(QuotationItem)
    // SEED.reverse().forEach(async quotationItem => {
    //   let record = await repository.findOne({ id: quotationItem.id })
    //   await repository.remove(record)
    // })
  }
}
