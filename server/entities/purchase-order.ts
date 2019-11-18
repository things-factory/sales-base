import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Quotation } from './quotation'

@Entity()
@Index('ix_purchase-order_0', (purchaseOrder: PurchaseOrder) => [
  purchaseOrder.domain,
  purchaseOrder.name,
  purchaseOrder.Bizplace
])
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @Column('date')
  issuedOn: Date

  @OneToOne(type => Quotation)
  @JoinColumn()
  quotation: Quotation

  @ManyToOne(type => Bizplace)
  Bizplace: Bizplace

  @Column()
  state: string

  @Column({
    nullable: true
  })
  description: string

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
