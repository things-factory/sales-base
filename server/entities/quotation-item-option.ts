import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { QuotationItem } from './quotation-item'

@Entity()
@Index(
  'ix_quotation-item-option_0',
  (quotationItemOption: QuotationItemOption) => [quotationItemOption.domain, quotationItemOption.name],
  { unique: true }
)
export class QuotationItemOption {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @Column({
    nullable: true
  })
  value: string

  @ManyToOne(type => QuotationItem, quotationItem => quotationItem.options)
  quotationItem: QuotationItem

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
