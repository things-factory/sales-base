import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { CollectionOrder } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedCollectionOrder1565245170072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(CollectionOrder)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async collectionOrder => {
        await repository.save({
          ...collectionOrder,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(CollectionOrder)
    SEED.reverse().forEach(async collectionOrder => {
      let record = await repository.findOne({ name: collectionOrder.name })
      await repository.remove(record)
    })
  }
}
