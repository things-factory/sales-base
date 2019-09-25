import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Location } from '@things-factory/warehouse-base'
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
import { CollectionOrder } from './collection-order'
import { OrderProduct } from './order-product'
import { OrderVas } from './order-vas'

@Entity()
@Index('ix_arrival-notice_0', (arrivalNotice: ArrivalNotice) => [arrivalNotice.domain, arrivalNotice.name], {
  unique: true
})
export class ArrivalNotice {
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

  @Column({
    nullable: true
  })
  containerNo: string

  @Column()
  ownTransport: boolean

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.arrivalNotice)
  orderProducts: OrderProduct[]

  @OneToMany(type => OrderVas, orderVas => orderVas.arrivalNotice)
  orderVass: OrderVas[]

  @Column({
    nullable: true
  })
  eta: Date

  @Column({
    nullable: true
  })
  collectionDateTime: Date

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
  truckNo: string

  @Column({
    nullable: true
  })
  loadType: string

  @Column()
  status: string

  @Column({
    nullable: true
  })
  remark: string

  @OneToOne(type => CollectionOrder)
  @JoinColumn()
  collectionOrder: CollectionOrder

  @Column({
    nullable: true
  })
  deliveryOrderNo: string

  @ManyToOne(type => Location)
  bufferLocation: Location

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
