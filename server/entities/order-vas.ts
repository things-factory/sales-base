import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { Domain } from '@things-factory/shell'
import { Inventory } from '@things-factory/warehouse-base'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ArrivalNotice, ReleaseGood, ReturnOrder, ShippingOrder, Vas, VasOrder } from '../entities'

@Entity('order_vass')
@Index('ix_order-vas_0', (orderVas: OrderVas) => [orderVas.domain, orderVas.name], {
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

  @Column({ nullable: true })
  batchId: string

  @Column({ nullable: true })
  set: number

  @Column({ nullable: true })
  targetType: string

  @Column({ nullable: true })
  targetBatchId: string

  @ManyToOne(type => Product, { nullable: true })
  targetProduct: Product

  @Column({ nullable: true })
  otherTarget: string

  @Column({ nullable: true })
  qty: number

  @Column({ nullable: true })
  weight: number

  @Column({ nullable: true })
  productName: string

  @Column({ nullable: true })
  packingType: string

  @ManyToOne(type => ArrivalNotice)
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => ReleaseGood)
  releaseGood: ReleaseGood

  @ManyToOne(type => ReturnOrder)
  returnOrder: ReturnOrder

  @ManyToOne(type => ShippingOrder)
  shippingOrder: ShippingOrder

  @ManyToOne(type => VasOrder)
  vasOrder: VasOrder

  @ManyToOne(type => Vas)
  vas: Vas

  @Column('text', { nullable: true })
  operationGuide: string

  @ManyToOne(type => Inventory, { nullable: true })
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

  @ManyToOne(type => User, { nullable: true })
  creator: User

  @ManyToOne(type => User, { nullable: true })
  updater: User
}
