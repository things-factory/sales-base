import { Product } from '@things-factory/product-base'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Quotation } from './quotation'
import { QuotationItemOption } from './quotation-item-option'

@Entity('quotation-items')
@Index('ix_quotation-item_0', (quotationItem: QuotationItem) => [
  quotationItem.domain,
  quotationItem.quotation,
  quotationItem.product
])
export class QuotationItem extends DomainBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column('float')
  qty: number

  @Column('text')
  unit: string

  @Column({
    type: 'decimal',
    precision: 2
  })
  price: number

  @Column({
    type: 'decimal',
    precision: 2
  })
  amount: number

  @ManyToOne(type => Product)
  product: Product

  @ManyToOne(type => Quotation, quotation => quotation.items)
  quotation: Quotation

  @OneToMany(type => QuotationItemOption, quotationItemOption => quotationItemOption.quotationItem)
  options: QuotationItemOption[]

  @Column('text', {
    nullable: true
  })
  description: string
}
