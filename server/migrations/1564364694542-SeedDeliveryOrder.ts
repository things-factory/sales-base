import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { DeliveryOrder } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedDeliveryOrder1564364694542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(DeliveryOrder)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async deliveryOrder => {
        await repository.save({
          ...deliveryOrder,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(DeliveryOrder)
    SEED.reverse().forEach(async deliveryOrder => {
      let record = await repository.findOne({ name: deliveryOrder.name })
      await repository.remove(record)
    })
  }
}
