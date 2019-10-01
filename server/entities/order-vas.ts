import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ShippingOrder } from '.'
import { ArrivalNotice } from './arrival-notice'
import { CollectionOrder } from './collection-order'
import { DeliveryOrder } from './delivery-order'
import { ReleaseGood } from './release-good'
import { Vas } from './vas'
import { VasOrder } from './vas-order'
import { Inventory } from '@things-factory/warehouse-base'

@Entity('order_vass')
@Index('ix_order-vas_0', (orderVas: OrderVas) => [orderVas.domain, orderVas.name], {
  unique: true
})
@Index('ix_order-vas_1', (orderVas: OrderVas) => [orderVas.arrivalNotice, orderVas.vas, orderVas.batchId], {
  unique: true
})
@Index('ix_order-vas_2', (orderVas: OrderVas) => [orderVas.collectionOrder, orderVas.vas, orderVas.batchId], {
  unique: true
})
@Index('ix_order-vas_3', (orderVas: OrderVas) => [orderVas.deliveryOrder, orderVas.vas, orderVas.batchId], {
  unique: true
})
@Index('ix_order-vas_4', (orderVas: OrderVas) => [orderVas.releaseGood, orderVas.vas, orderVas.batchId], {
  unique: true
})
export class OrderVas {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @ManyToOne(type => Bizplace, {
    nullable: false
  })
  bizplace: Bizplace

  @Column()
  name: string

  @Column()
  batchId: string

  @ManyToOne(type => ArrivalNotice)
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => CollectionOrder)
  collectionOrder: CollectionOrder

  @ManyToOne(type => DeliveryOrder)
  deliveryOrder: DeliveryOrder

  @ManyToOne(type => ReleaseGood)
  releaseGood: ReleaseGood

  @ManyToOne(type => ShippingOrder)
  shippingOrder: ShippingOrder

  @ManyToOne(type => VasOrder)
  vasOrder: VasOrder

  @ManyToOne(type => Vas, {
    nullable: false
  })
  vas: Vas

  @ManyToOne(type => Inventory)
  inventory: Inventory

  @Column({
    nullable: true
  })
  type: string

  @Column()
  remark: string

  @Column({
    nullable: true
  })
  description: string

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
