import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Bizplace } from '@things-factory/biz-base'
import { OrderVas } from './order-vas'
import { DeliveryOrder } from './delivery-order'
import { ShippingOrder } from './shipping-order'
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
import { OrderInventory } from './order-inventory'

@Entity()
@Index('ix_release-good_0', (releaseGood: ReleaseGood) => [releaseGood.domain, releaseGood.name], { unique: true })
export class ReleaseGood {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column({
    nullable: true
  })
  name: string

  @Column({
    nullable: true
  })
  collectionOrderNo: string

  @Column({
    nullable: true
  })
  description: string

  @Column()
  ownTransport: Boolean

  @Column({
    nullable: true
  })
  truckNo: string

  @Column({
    nullable: true
  })
  inventoryId: string

  @Column({
    nullable: true
  })
  productId: string

  @Column()
  shippingOption: Boolean

  @OneToOne(type => DeliveryOrder)
  @JoinColumn()
  deliveryOrder: DeliveryOrder

  @OneToOne(type => ShippingOrder)
  @JoinColumn()
  shippingOrder: ShippingOrder

  @OneToMany(type => OrderVas, orderVas => orderVas.releaseGood)
  orderVass: OrderVas[]

  @OneToMany(type => OrderInventory, orderInventory => orderInventory.releaseGood)
  orderInventories: OrderInventory[]

  @Column()
  from: string

  @Column()
  to: string

  @Column()
  status: string

  @Column()
  releaseDateTime: Date

  @Column({
    nullable: true
  })
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
