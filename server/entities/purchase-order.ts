import { Entity, Index, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { Customer } from '@things-factory/biz-base'
import { Quotation } from './quotation'

@Entity('purchase-orders')
@Index('ix_purchase-order_0', (purchaseOrder: PurchaseOrder) => [
  purchaseOrder.domain,
  purchaseOrder.name,
  purchaseOrder.customer
])
export class PurchaseOrder extends DomainBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column('text')
  name: string

  @Column('date')
  issuedOn: Date

  @OneToOne(type => Quotation)
  @JoinColumn()
  quotation: Quotation

  @Column('text')
  customer: Customer

  @Column('text')
  state: string

  @Column('text', {
    nullable: true
  })
  description: string
}
