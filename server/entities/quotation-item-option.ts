import { Entity, Index, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { QuotationItem } from './quotation-item'

@Entity('quotation-item-options')
@Index(
  'ix_quotation-item-option_0',
  (quotationItemOption: QuotationItemOption) => [quotationItemOption.domain, quotationItemOption.name],
  { unique: true }
)
export class QuotationItemOption extends DomainBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column('text', {
    nullable: true
  })
  name: string

  @Column('text', {
    nullable: true
  })
  value: string

  @ManyToOne(type => QuotationItem, quotationItem => quotationItem.options)
  quotationItem: QuotationItem

  @Column('text', {
    nullable: true
  })
  description: string
}
