import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { DeliveryOrder, OrderInventory, OrderVas, ShippingOrder } from '../entities'

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

  @Column({
    nullable: true
  })
  truckNo: string

  @Column()
  exportOption: Boolean

  @Column()
  ownTransport: Boolean

  @OneToMany(type => DeliveryOrder, deliveryOrder => deliveryOrder.releaseGood)
  deliveryOrders: DeliveryOrder[]

  @OneToOne(type => ShippingOrder)
  @JoinColumn()
  shippingOrder: ShippingOrder

  @OneToMany(type => OrderVas, orderVas => orderVas.releaseGood)
  orderVass: OrderVas[]

  @OneToMany(type => OrderInventory, orderInventory => orderInventory.releaseGood)
  orderInventories: OrderInventory[]

  @Column()
  status: string

  @Column({
    nullable: true
  })
  releaseDateTime: Date

  @Column({
    nullable: true
  })
  refNo: String

  @Column({
    nullable: true
  })
  releaseDate: string

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
