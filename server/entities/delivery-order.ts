import { User } from '@things-factory/auth-base'
import { Customer } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Product } from './product'

@Entity()
@Index('ix_delivery-order_0', (deliveryOrder: DeliveryOrder) => [deliveryOrder.domain, deliveryOrder.name], {
  unique: true
})
export class DeliveryOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @ManyToMany(type => Product, product => product.deliveryOrders)
  products: Product[]

  @Column({
    nullable: true
  })
  from: string

  @Column()
  to: string

  @Column({
    comment: 'delivery time'
  })
  time: string

  @Column({
    comment: 'delivery date'
  })
  date: string

  @Column('date')
  issuedOn: Date

  @ManyToOne(type => Customer)
  customer: Customer

  @Column()
  status: string

  @Column({
    nullable: true
  })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}
