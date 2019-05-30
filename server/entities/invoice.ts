import { Entity, Index, Column, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { Customer } from '@things-factory/biz-base'
import { PurchaseOrder } from './purchase-order'

@Entity('invoices')
@Index('ix_invoice_0', (invoice: Invoice) => [invoice.domain, invoice.name, invoice.customer])
export class Invoice extends DomainBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column('text')
  name: string

  @Column('text')
  customer: Customer

  @Column('date')
  issuedOn: Date

  @Column('date')
  paymentDue: Date

  @Column('text')
  version: string

  @OneToOne(type => PurchaseOrder)
  @JoinColumn()
  purchaseOrder: PurchaseOrder

  @Column('text')
  state: string

  @Column('text', {
    nullable: true
  })
  description: string
}
