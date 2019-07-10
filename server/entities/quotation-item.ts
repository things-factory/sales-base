import { User } from '@things-factory/auth-base'
import { Product } from '@things-factory/product-base'
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
import { Quotation } from './quotation'
import { QuotationItemOption } from './quotation-item-option'

@Entity()
@Index('ix_quotation-item_0', (quotationItem: QuotationItem) => [
  quotationItem.domain,
  quotationItem.quotation,
  quotationItem.product
])
export class QuotationItem {
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
