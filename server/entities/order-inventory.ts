import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Inventory } from '@things-factory/warehouse-base'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { DeliveryOrder, ReleaseGood, ShippingOrder, ArrivalNotice } from '../entities'

@Entity()
@Index('ix_order-inventory_0', (orderInventory: OrderInventory) => [orderInventory.domain, orderInventory.name], {
  unique: true
})
@Index(
  'ix_order-inventory_1',
  (orderInventory: OrderInventory) => [orderInventory.bizplace, orderInventory.shippingOrder, orderInventory.seq],
  {
    unique: true
  }
)
@Index(
  'ix_order-inventory_2',
  (orderInventory: OrderInventory) => [orderInventory.bizplace, orderInventory.releaseGood, orderInventory.seq],
  {
    unique: true
  }
)
@Index(
  'ix_order-inventory_3',
  (orderInventory: OrderInventory) => [orderInventory.bizplace, orderInventory.deliveryOrder, orderInventory.seq],
  {
    unique: true
  }
)
export class OrderInventory {
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
  type: string

  @Column({
    nullable: true
  })
  remark: string

  @Column({
    nullable: true
  })
  issue: string

  @Column({
    nullable: true
  })
  description: string

  @ManyToOne(type => Inventory, {
    nullable: false
  })
  inventory: Inventory

  @ManyToOne(type => ArrivalNotice)
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => ReleaseGood)
  releaseGood: ReleaseGood

  @ManyToOne(type => ShippingOrder)
  shippingOrder: ShippingOrder

  @ManyToOne(type => DeliveryOrder)
  deliveryOrder: DeliveryOrder

  @Column()
  releaseQty: number

  @Column()
  seq: number

  @Column()
  status: string

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
