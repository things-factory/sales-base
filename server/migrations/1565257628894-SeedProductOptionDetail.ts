import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { ProductOptionDetail } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedProductOptionDetail1565257628894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(ProductOptionDetail)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async productOptionDetail => {
        await repository.save({
          ...productOptionDetail,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(ProductOptionDetail)
    SEED.reverse().forEach(async productOptionDetail => {
      let record = await repository.findOne({ name: productOptionDetail.name })
      await repository.remove(record)
    })
  }
}
