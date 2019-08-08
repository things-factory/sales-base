import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { ShippingOrder } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedShippingOrder1565246401220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(ShippingOrder)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async shippingOrder => {
        await repository.save({
          ...shippingOrder,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(ShippingOrder)
    SEED.reverse().forEach(async shippingOrder => {
      let record = await repository.findOne({ name: shippingOrder.name })
      await repository.remove(record)
    })
  }
}
