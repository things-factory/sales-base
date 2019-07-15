import { User } from '@things-factory/auth-base'
import { Customer } from '@things-factory/biz-base'
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
import { QuotationItem } from './quotation-item'

@Entity('quotations')
@Index('ix_quotation_0', (quotation: Quotation) => [quotation.domain, quotation.name])
@Index('ix_quotation_1', (quotation: Quotation) => [quotation.domain, quotation.customer, quotation.issuedOn])
export class Quotation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @ManyToOne(type => Customer)
  customer: Customer

  @Column('date')
  issuedOn: Date

  @Column('date')
  expiresOn: Date

  @Column()
  version: string

  @OneToMany(type => QuotationItem, quotationItem => quotationItem.quotation)
  items: QuotationItem[]

  @Column()
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
