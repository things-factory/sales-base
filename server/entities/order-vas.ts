import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Inventory } from '@things-factory/warehouse-base'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ArrivalNotice, ReleaseGood, ShippingOrder, Vas, VasOrder } from '../entities'

@Entity('order_vass')
@Index('ix_order-vas_0', (orderVas: OrderVas) => [orderVas.domain, orderVas.name], {
  unique: true
})
@Index('ix_order-vas_1', (orderVas: OrderVas) => [orderVas.arrivalNotice, orderVas.vas, orderVas.batchId])
@Index('ix_order-vas_2', (orderVas: OrderVas) => [orderVas.releaseGood, orderVas.vas, orderVas.batchId])
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

  @ManyToOne(type => ReleaseGood)
  releaseGood: ReleaseGood

  @ManyToOne(type => ShippingOrder)
  shippingOrder: ShippingOrder

  @ManyToOne(type => VasOrder)
  vasOrder: VasOrder

  @ManyToOne(type => Vas)
  vas: Vas

  @Column('text', {
    nullable: true
  })
  operationGuide: string

  @ManyToOne(type => Inventory)
  inventory: Inventory

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
