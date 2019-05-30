import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { PurchaseOrder } from '../entities'

const SEED = [
  {
    name: 'Seed',
    description: 'Description for Seed'
  }
]

export class SeedPurchaseOrder1558583304819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(PurchaseOrder)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED.forEach(async purchaseOrder => {
        await repository.save({
          ...purchaseOrder,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(PurchaseOrder)
    SEED.reverse().forEach(async purchaseOrder => {
      let record = await repository.findOne({ name: purchaseOrder.name })
      await repository.remove(record)
    })
  }
}
