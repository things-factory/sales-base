import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { ArrivalNotice } from './arrival-notice'
import { TransportOrderDetail } from './transport-order-detail'

@Entity()
@Index('ix_collection-order_0', (collectionOrder: CollectionOrder) => [collectionOrder.domain, collectionOrder.name], {
  unique: true
})
export class CollectionOrder {
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
  from: string

  @Column({
    nullable: true
  })
  to: string

  @Column({
    nullable: true
  })
  collectionDateTime: Date

  @Column({
    nullable: true
  })
  collectionDate: string

  @Column('float', {
    nullable: true
  })
  loadWeight: Number

  @Column({
    nullable: true
  })
  cargoType: string

  @Column({
    nullable: true
  })
  urgency: Boolean

  @Column({
    nullable: true
  })
  looseItem: Boolean

  @Column({
    nullable: true
  })
  refNo: string

  @Column({
    nullable: true
  })
  truckNo: string

  @ManyToOne(type => ArrivalNotice)
  arrivalNotice: ArrivalNotice

  @OneToMany(type => TransportOrderDetail, transportOrderDetail => transportOrderDetail.collectionOrder)
  transportOrderDetails: TransportOrderDetail[]

  @Column({
    nullable: true
  })
  telNo: string

  @Column({
    nullable: true
  })
  remark: string

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
