import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Priviledge } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'

const SEEDS_PRIVILEDGE = [
  {
    name: 'query',
    category: 'order',
    description: 'to read order data'
  },
  {
    name: 'mutation',
    category: 'order',
    description: 'to edit order data'
  }
]

export class SeedPriviledge1566878275134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Priviledge)
    const domain = await getRepository(Domain).findOne({ where: { name: 'SYSTEM' } })

    try {
      for (let i = 0; i < SEEDS_PRIVILEDGE.length; i++) {
        const priviledge = SEEDS_PRIVILEDGE[i]
        await repository.save({
          domain,
          ...priviledge
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Priviledge)

    SEEDS_PRIVILEDGE.reverse().forEach(async priviledge => {
      let record = await repository.findOne({ name: priviledge.name })
      await repository.remove(record)
    })
  }
}
