import { User } from '@things-factory/auth-base'
import { Customer } from '@things-factory/biz-base'
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
import { PurchaseOrder } from './purchase-order'

@Entity('invoices')
@Index('ix_invoice_0', (invoice: Invoice) => [invoice.domain, invoice.name, invoice.customer])
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @Column()
  customer: Customer

  @Column('date')
  issuedOn: Date

  @Column('date')
  paymentDue: Date

  @Column()
  version: string

  @OneToOne(type => PurchaseOrder)
  @JoinColumn()
  purchaseOrder: PurchaseOrder

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
