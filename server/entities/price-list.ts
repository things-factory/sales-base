import { User } from '@things-factory/auth-base'
import { Product } from '@things-factory/product-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('price-lists')
@Index('ix_price-list_0', (priceList: PriceList) => [priceList.domain, priceList.name], { unique: true })
export class PriceList {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column('text')
  name: string

  @Column({
    type: 'datetime',
    comment: 'The date and time where price of item undergoes revision'
  })
  revisionPriceOn: Date

  @ManyToOne(type => Product)
  product: Product

  @Column('text', {
    nullable: true
  })
  optionName: string

  @Column('text', {
    nullable: true
  })
  optionValue: string

  @Column({
    type: 'decimal',
    precision: 2
  })
  price: number

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
