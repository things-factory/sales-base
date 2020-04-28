import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { OrderInventory } from './order-inventory'

@Entity()
@Index('ix_inventory-check_0', (inventoryCheck: InventoryCheck) => [inventoryCheck.domain, inventoryCheck.name], {
  unique: true
})
export class InventoryCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @Column({
    nullable: true
  })
  executionDate: string

  @Column()
  type: string

  @Column()
  status: string

  @OneToMany(type => OrderInventory, orderInventory => orderInventory.inventoryCheck)
  orderInventories: OrderInventory[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}
