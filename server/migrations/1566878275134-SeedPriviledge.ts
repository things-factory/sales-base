import { Priviledge } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

const SEEDS_PRIVILEDGES = [
  {
    name: 'query',
    category: 'order',
    description: 'read order data'
  },
  {
    name: 'mutation',
    category: 'order',
    description: 'edit order data'
  },
  {
    name: 'query',
    category: 'vas',
    description: 'read order data'
  },
  {
    name: 'mutation',
    category: 'vas',
    description: 'edit order data'
  },
  {
    name: 'query',
    category: 'claim',
    description: 'read claim data'
  },
  {
    name: 'mutation',
    category: 'claim',
    description: 'edit claim data'
  }
]

export class SeedPriviledge1566878275134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const domains = await getRepository(Domain).find()

    try {
      for (let i = 0; i < domains.length; i++) {
        const domain = domains[i]

        for (let i = 0; i < SEEDS_PRIVILEDGES.length; i++) {
          const priviledge: Priviledge = SEEDS_PRIVILEDGES[i]
          priviledge.domain = domain

          await getRepository(Priviledge).save({
            ...priviledge
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Priviledge)

    SEEDS_PRIVILEDGES.reverse().forEach(async priviledge => {
      let record = await repository.findOne({ name: priviledge.name })
      await repository.remove(record)
    })
  }
}
