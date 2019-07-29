import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm'
import { Customer } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'
import { TransportOrder } from '@things-factory/transport-base'
import { Product } from '@things-factory/product-base'

@Entity('delivery-orders')
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

  @Column()
  type: string

  @Column('date')
  issuedOn: Date

  @OneToOne(type => TransportOrder)
  transportOrder: TransportOrder

  @ManyToOne(type => Customer)
  customer: Customer

  @ManyToOne(type => Product)
  product: Product

  @Column()
  state: string

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
