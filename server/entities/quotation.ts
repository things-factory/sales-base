import { Entity, Index, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { QuotationItem } from './quotation-item'
import { Customer } from '@things-factory/biz-base'

@Entity('quotations')
@Index('ix_quotation_0', (quotation: Quotation) => [quotation.domain, quotation.name])
@Index('ix_quotation_1', (quotation: Quotation) => [quotation.domain, quotation.customer, quotation.issuedOn])
export class Quotation extends DomainBaseEntity {
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
  expiresOn: Date

  @Column('text')
  version: string

  @OneToMany(type => QuotationItem, quotationItem => quotationItem.quotation)
  items: QuotationItem[]

  @Column('text')
  currency: string

  @Column({
    type: 'decimal',
    precision: 2
  })
  vat: number

  @Column({
    type: 'decimal',
    precision: 2
  })
  totalPrice: number

  @Column('text')
  state: string

  @Column('text', {
    nullable: true
  })
  description: string
}
