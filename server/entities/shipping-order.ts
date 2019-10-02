import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Bizplace } from '@things-factory/biz-base'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@Index('ix_shipping-order_0', (shippingOrder: ShippingOrder) => [shippingOrder.domain, shippingOrder.name], {
  unique: true
})
export class ShippingOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @Column()
  shipName: string

  @Column()
  containerNo: string

  @Column()
  containerArrivalDate: Date

  @Column()
  containerLeavingDate: Date

  @Column({
    nullable: true
  })
  from: string

  @Column({
    nullable: true
  })
  to: string

  @Column({
    nullable: true
  })
  remark: string

  @Column({
    nullable: true
  })
  loadType: string

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
