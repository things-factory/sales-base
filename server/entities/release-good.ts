import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Bizplace } from '@things-factory/biz-base'
import { OrderVas } from './order-vas'
import { DeliveryOrder } from './delivery-order'
import { ShippingOrder } from './shipping-order'
import { OrderProduct } from './order-product'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
@Index('ix_release-good_0', (releaseGood: ReleaseGood) => [releaseGood.domain, releaseGood.name], { unique: true })
export class ReleaseGood {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @Column()
  from: string

  @Column()
  to: string

  @Column()
  ownTransport: Boolean

  @Column({
    nullable: true
  })
  truckNo: string

  @Column()
  inventoryId: string

  @Column()
  productId: string

  @Column({
    nullable: true
  })
  deliveryDateTime: Date

  @Column({
    nullable: true
  })
  loadType: string

  @Column({
    nullable: true
  })
  deliveryOrderNo: string

  @OneToOne(type => DeliveryOrder)
  @JoinColumn()
  deliveryOrder: DeliveryOrder

  @Column()
  shippingOption: Boolean

  @Column()
  shipName: string

  @Column()
  containerNo: string

  @OneToOne(type => ShippingOrder)
  @JoinColumn()
  shippingOrder: ShippingOrder

  @OneToMany(type => OrderVas, orderVas => orderVas.releaseGood)
  orderVass: OrderVas[]

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.releaseGood)
  orderProducts: OrderProduct[]

  @Column()
  status: string

  @Column()
  releaseDate: Date

  @Column()
  remark: string

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
