import { User } from '@things-factory/auth-base'
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

@Entity('shipping-orders')
@Index('ix_shipping-order_0', (shippingOrder: ShippingOrder) => [shippingOrder.domain, shippingOrder.name], {
  unique: true
})
export class ShippingOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToMany(type => Product, product => product.shippingOrders)
  products: Product[]

  @Column()
  name: string

  @Column()
  shipName: string

  @Column()
  containerNo: string

  @Column()
  from: string

  @Column()
  to: string

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
