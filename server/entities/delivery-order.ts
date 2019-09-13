import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
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
import { OrderProduct } from './order-product'
import { OrderVas } from './order-vas'

@Entity()
@Index('ix_delivery-order_0', (deliveryOrder: DeliveryOrder) => [deliveryOrder.domain, deliveryOrder.name], {
  unique: true
})
export class DeliveryOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.deliveryOrder)
  orderProducts: OrderProduct[]

  @OneToMany(type => OrderVas, orderVas => orderVas.deliveryOrder)
  orderVass: OrderVas[]

  @Column({
    nullable: true
  })
  from: string

  @Column()
  to: string

  @Column({
    nullable: true
  })
  truckNo: string

  @Column({
    nullable: true
  })
  deliveryDateTime: Date

  @Column({
    comment: 'FCL or LCL'
  })
  loadType: string

  @Column({
    nullable: true
  })
  telNo: string

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
